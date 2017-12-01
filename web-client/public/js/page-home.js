$(document).ready(() => {
  const keys = ['caseStatus', 'solvabilityFactor', 'bureau', 'division'];

  const token = window.sessionStorage.getItem('userInfo-token');

  const parseData = (data) => {
    const freqData = {};
    keys.forEach((k) => {
      freqData[k] = {};
    });
    data.forEach((d) => {
      keys.forEach((k) => {
        const value = d[k];
        if (!freqData[k][value]) {
          freqData[k][value] = 1;
        } else {
          freqData[k][value] += 1;
        }
      });
    });
    return freqData;
  };

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/cases',
    headers: {
      'x-access-token': token
    }
  }).then((data) => {
    const rawData = data;
    const parsedData = parseData(data);
    const caseStatusKeys = Object.keys(parsedData.caseStatus);
    // console.log(parsedData);

    const drawDashboard = (input) => {
      // https://bl.ocks.org/mbostock/3887235

      let total = 0;

      const svg = d3.select('svg');
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const radius = (Math.min(width, height) / 2) - 20;
      const pieChart = svg.append('g').attr('transform', 'translate(' + width / 4 + ',' + height / 2 + ')');

      const color = d3.scaleOrdinal(d3.schemeSet3);

      const pie = d3.pie()
          .sort(null)
          .value(function(d) { return d.freq; });

      var path = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var label = d3.arc()
          .outerRadius(radius - 50)
          .innerRadius(radius - 50);

      var tF = caseStatusKeys.map(function(d){
          total += input['caseStatus'][d] || 0;
          return {type:d, freq: input['caseStatus'][d] || 0 };
      });
      console.log('TOTAL: ', total);

      var arc = pieChart.selectAll('.arc')
          .data(pie(tF))
          .enter().append('g')
          .attr('class', 'arc');

      arc.append('path')
            .attr('d', path)
            .attr('id', function(d, i) {
              return 'arc-' + i
            })
            .attr('fill', function(d) { return color(d.data.type); })

      arc.append('text')
            .attr('transform', function(d) { return 'translate(' + label.centroid(d) + ')'; })
            .attr('dy', '0.35em')
            .text(function(d) { return `${d.data.freq / total * 100}%`; });


      // Many thanks to: http://bl.ocks.org/ChandrakantThakkarDigiCorp/c8ce360f8bc896ffa6c16d30a4cd026b
      // for tooptip and exterior labeling code
      arc.append('text')
            .attr('dx', 30)
            .attr('dy', -5)
            .append('textPath')
            .attr('xlink:href', function(d, i) {
                return '#arc-' + i;
            })
            .text(function(d) {
              switch(d.data.type) {
                case 'Investigation Continued':
                    return 'IC';
                case 'Cleared by Arrest':
                    return 'CBA'
                case 'Murder-Suicide':
                    return 'MS';
                case 'Accidental':
                    return 'Acc'
                case 'Cleared by Arrest':
                    return 'CBA'
                case 'Cleared Other':
                    return 'CO'
                case 'Suicide':
                    return 'S'
                case 'Natural':
                    return 'N'
                default:
                    return d.data.type;
              }
            });

            var mainDivName = 'dashboard';

                //CBT:give blinking effect on mouse over
                arc.on('mouseover', function(d) {
                    var currentEl = d3.select(this);
                    // console.log('CURRENT EL', currentEl._groups['0']['0'].__data__.data.type);
                    currentEl.attr('style', 'fill-opacity:1;');
                    var caseStatusVal = currentEl._groups['0']['0'].__data__.data.type;
                    drawHistogram(caseStatusVal, 'bureau');

                    var fadeInSpeed = 120;
                    d3.select('#tooltip_' + mainDivName)
                        .transition()
                        .duration(fadeInSpeed)
                        .style('opacity', function() {
                            return 1;
                        });
                    d3.select('#tooltip_' + mainDivName)
                        .attr('transform', function(d) {
                            var mouseCoords = d3.mouse(this.parentNode);
                            var xCo = mouseCoords[0] + 10;;
                            var yCo = mouseCoords[0] + 10;
                            return 'translate(' + xCo + ',' + yCo + ')';
                        });
                    d3.selectAll('#tooltipText_' + mainDivName).text('');
                    var yPos = 0;
                    d3.selectAll('#tooltipText_' + mainDivName).append('tspan').attr('x', 0).attr('y', yPos * 10).attr('dy', '1.9em').text('Case Status:  ' + caseStatusVal);
                    var dims = helpers.getDimensions('tooltipText_' + mainDivName);
                    d3.selectAll('#tooltipText_' + mainDivName + ' tspan')
                        .attr('x', dims.w + 2);

                    d3.selectAll('#tooltipRect_' + mainDivName)
                        .attr('width', dims.w + 10)
                        .attr('height', dims.h + 20);
                });
                arc.on('mousemove', function(d) {
                    var currentEl = d3.select(this);
                    d3.selectAll('#tooltip_' + mainDivName)
                        .attr('transform', function(d) {
                            var mouseCoords = d3.mouse(this.parentNode);
                            var xCo = mouseCoords[0] + 10;
                            var yCo = mouseCoords[1] + 10;
                            return 'translate(' + xCo + ',' + yCo + ')';
                        });
                });
                arc.on('mouseout', function(d) {
                    var currentEl = d3.select(this);
                    currentEl.attr('style', 'fill-opacity:0.85;');

                    d3.select('#tooltip_' + mainDivName)
                        .style('opacity', function() {
                            return 0;
                        });
                    d3.select('#tooltip_' + mainDivName).attr('transform', function(d, i) {
                        var x = -500;
                        var y = -500;
                        return 'translate(' + x + ',' + y + ')';
                    });
                });

                var helpers = {
                    getDimensions: function(id) {
                        var el = document.getElementById(id);
                        var w = 0,
                            h = 0;
                        if (el) {
                            var dimensions = el.getBBox();
                            w = dimensions.width;
                            h = dimensions.height;
                        } else {
                            console.log('error: getDimensions() ' + id + ' not found.');
                        }
                        return {
                            w: w,
                            h: h
                        };
                    }
                }

                //CBT:tooltips start
                var tooltipg = pieChart.append('g')
                    .attr('font-family', 'sans-serif')
                    .attr('font-size', 10)
                    .attr('text-anchor', 'end')
                    .attr('id', 'tooltip_' + mainDivName)
                    .attr('style', 'opacity:0')
                    .attr('transform', 'translate(-500,-500)');

                tooltipg.append('rect')
                    .attr('id', 'tooltipRect_' + mainDivName)
                    .attr('x', 0)
                    .attr('width', 120)
                    .attr('height', 80)
                    .attr('opacity', 0.8)
                    .style('fill', '#000000');

                tooltipg
                    .append('text')
                    .attr('id', 'tooltipText_' + mainDivName)
                    .attr('x', 30)
                    .attr('y', 15)
                    .attr('fill', '#fff')
                    .style('font-size', 10)
                    .style('font-family', 'arial')
                    .text(function(d, i) {
                        return '';
                    });
                //CBT:tooltips end

      var drawHistogram = function (caseStatusVal, xAxis) {
        // Simple bar graph Tutorial: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
        d3.select('.hist').remove();
        // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 50, left: 40 + (width / 2) + 20},
          w = 960 - margin.left - margin.right,
          h = 500 - margin.top - margin.bottom;
      var histogram = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('class', 'hist');
        var filtered = rawData.filter(function (d) {
          return d.caseStatus === caseStatusVal;
        });
        var data = {};
        filtered.forEach((c) => {
          if (!data[c[xAxis]]) {
            data[c[xAxis]] = 1;
          } else {
            data[c[xAxis]] += 1;
          }
        });
        console.log('DATA', data);
        var keys = Object.keys(data);

        data = keys.map(function(d){
            return {type:d, freq: data[d] || 0 };
        });

        console.log(data);

        // https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
        var x = d3.scaleBand()
          .range([0, w])
          .padding(0.1);
        var y = d3.scaleLinear()
          .range([h, 0]);

        x.domain(data.map(function(d) { return d.type; }));
        y.domain([0, d3.max(data, function(d) { return d.freq; })]);

        histogram.selectAll('.bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.type); })
          .attr('width', x.bandwidth())
          .attr('y', function(d) { return y(d.freq); })
          .attr('height', function(d) { return h - y(d.freq); });

          // text label for the title
        histogram.append('text')
            .attr('transform',
                  'translate(' + (w/2) + ' ,' +
                                 (0) + ')')
            .style('text-anchor', 'middle')
            .text(caseStatusVal);

      // add the x Axis
        histogram.append('g')
            .attr('transform', 'translate(0,' + h + ')')
            .call(d3.axisBottom(x));

            // text label for the x axis
          histogram.append('text')
              .attr('transform',
                    'translate(' + (w/2) + ' ,' +
                                   (h + margin.top + 20) + ')')
              .style('text-anchor', 'middle')
              .text(xAxis);

        // add the y Axis
        histogram.append('g')
            .call(d3.axisLeft(y).
            tickFormat(function(d){
              if (d % 1 !== 0) {
                return ''
              } else {
                return d;
              }
            }));

            // text label for the y axis
    histogram.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left + width / 2 + 20)
        .attr('x', 0 - (h / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('# of Cases');
      }
    };
    drawDashboard(parsedData);
  });
});
