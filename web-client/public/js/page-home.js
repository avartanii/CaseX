/* global d3 */
/* eslint func-names: "off", prefer-template: "off", no-underscore-dangle: "off" */

$(document).ready(() => {
  const resizeBox = () => {
    const wellMaxWidth = $('body > div.row > div.col-lg-10.col-sm-12').width() - $('svg').width();
    const padding = +$('#well-form').css('padding').split('px')[0];
    const newWidth = wellMaxWidth - (padding * 2);
    if (newWidth > 125) {
      $('#well-form').css('width', `${newWidth}px`);
    }
  };

  resizeBox();

  $(window).on('resize', () => {
    resizeBox();
  });

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
    $('#caseCount').text(data.length);
    const parsedData = parseData(data);
    const caseStatusKeys = Object.keys(parsedData.caseStatus);
    let countSelection = 'bureau'; // default

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = (Math.min(width, height) / 2) - 20;
    const pieChart = svg.append('g').attr('transform', `translate(${(width / 4) + 30},${height / 2})`);

    // Simple bar graph: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
    const drawHistogram = (caseStatusVal, xAxis) => {
      d3.select('.hist').remove();
      // set the dimensions and margins of the graph
      const margin = {
        top: 35, right: 40, bottom: 40, left: (width / 2) + 75
      };
      const w = width - margin.left - margin.right;
      const h = height - margin.top - margin.bottom;
      const histogram = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('class', 'hist');
      const filtered = rawData.filter(d => d.caseStatus === caseStatusVal);
      let histData = {};
      filtered.forEach((c) => {
        if (!histData[c[xAxis]]) {
          histData[c[xAxis]] = 1;
        } else {
          histData[c[xAxis]] += 1;
        }
      });
      const histKeys = Object.keys(histData);
      histData = histKeys.map((d) => {
        return { type: d, freq: histData[d] || 0 };
      });

      // https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
      const x = d3.scaleBand()
        .range([0, w])
        .padding(0.1);
      const y = d3.scaleLinear()
        .range([h, 0]);

      x.domain(histData.map(d => d.type));
      y.domain([0, d3.max(histData, d => d.freq)]);

      const barChart = histogram.selectAll('.bar')
        .data(histData)
        .enter().append('g');

      barChart.append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.type))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.freq))
        .attr('height', d => h - y(d.freq));


      // data label
      barChart.append('text')
        .attr('y', d => y(d.freq))
        .attr('x', (d, i) => {
          const step = x.step();
          const padding = x.padding();
          return ((step * padding) + (step * (i + 1))) - (x.bandwidth() / 2);
        })
        .attr('dy', '1em')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 18)
        .attr('fill', '#ffffff')
        .style('text-anchor', 'middle')
        .text(d => d.freq);

      // text label for the title
      histogram.append('text')
        .attr('transform', 'translate(' + (w / 2) + ' ,' + -20 + ')')
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .text(`Case Status: ${caseStatusVal}`);

      // add the x Axis
      histogram.append('g')
        .attr('transform', 'translate(0,' + h + ')')
        .call(d3.axisBottom(x));

      // text label for the x axis
      histogram.append('text')
        .attr('transform', 'translate(' + (w / 2) + ' ,' + (h + margin.top) + ')')
        .style('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(xAxis);

      // add the y Axis
      histogram.append('g')
        .call(d3.axisLeft(y).tickFormat((d) => {
          if (d % 1 !== 0) {
            return '';
          }
          return d;
        }));

      // text label for the y axis
      histogram.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + (width / 2) + 35)
        .attr('x', 0 - (h / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('# of Cases');
    };

    // https://bl.ocks.org/mbostock/3887235
    const drawDashboard = (input) => {
      let total = 0;

      const color = d3.scaleOrdinal(d3.schemeSet3);

      const pie = d3.pie()
        .sort(null)
        .value(d => d.freq);

      const path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      const label = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50);

      const tF = caseStatusKeys.map((d) => {
        total += input['caseStatus'][d] || 0;
        return { type: d, freq: input['caseStatus'][d] || 0 };
      });

      const arc = pieChart.selectAll('.arc')
        .data(pie(tF))
        .enter().append('g')
        .attr('class', 'arc');

      arc.append('path')
        .attr('d', path)
        .attr('id', (d, i) => `arc-${i}`)
        .attr('fill', d => color(d.data.type));

      arc.append('text')
        .attr('transform', d => `translate(${label.centroid(d)})`)
        .attr('dy', '0.35em')
        .text(d => `${((d.data.freq / total) * 100).toFixed(1)}%`);

      // Many thanks to: http://bl.ocks.org/ChandrakantThakkarDigiCorp/c8ce360f8bc896ffa6c16d30a4cd026b
      // for tooptip and exterior labeling code
      arc.append('text')
        .attr('dx', 30)
        .attr('dy', -5)
        .append('textPath')
        .attr('xlink:href', (d, i) => `#arc-${i}`)
        .text((d) => {
          switch (d.data.type) {
            case 'Investigation Continued':
              return 'IC';
            case 'Cleared by Arrest':
              return 'CBA';
            case 'Murder-Suicide':
              return 'MS';
            case 'Accidental':
              return 'Acc';
            case 'Justifiable':
              return 'J';
            case 'Cleared Other':
              return 'CO';
            case 'Suicide':
              return 'S';
            case 'Natural':
              return 'N';
            case 'Undetermined Death':
              return 'UD';
            case 'Warrant':
              return 'W';
            default:
              return d.data.type;
          }
        });

      const mainDivName = 'dashboard';

      const helpers = {
        getDimensions: (id) => {
          const el = document.getElementById(id);
          let w = 0;
          let h = 0;
          if (el) {
            const dimensions = el.getBBox();
            w = dimensions.width;
            h = dimensions.height;
          } else {
            console.log('error: getDimensions() ' + id + ' not found.');
          }
          return {
            w,
            h
          };
        }
      };

      arc.on('mouseover', function () {
        const currentEl = d3.select(this);
        currentEl.attr('style', 'fill-opacity:1;');
        const caseStatusVal = currentEl._groups['0']['0'].__data__.data.type;
        drawHistogram(caseStatusVal, countSelection);

        d3.selectAll('.countOption').on('click', function () {
          countSelection = this.value;
          drawHistogram(caseStatusVal, this.value);
        });
        const fadeInSpeed = 120;
        d3.select('#tooltip_' + mainDivName)
          .transition()
          .duration(fadeInSpeed)
          .style('opacity', () => 1);
        d3.select('#tooltip_' + mainDivName)
          .attr('transform', function () {
            const mouseCoords = d3.mouse(this.parentNode);
            const xCo = mouseCoords[0] + 10;
            const yCo = mouseCoords[0] + 10;
            return 'translate(' + xCo + ',' + yCo + ')';
          });

        d3.selectAll('#tooltipText_' + mainDivName).text('');
        const yPos = 0;
        d3.selectAll('#tooltipText_' + mainDivName)
          .append('tspan').attr('x', 0)
          .attr('y', yPos * 10)
          .attr('dy', '1.9em')
          .text('Case Status:  ' + caseStatusVal);
        const dims = helpers.getDimensions('tooltipText_' + mainDivName);
        d3.selectAll('#tooltipText_' + mainDivName + ' tspan')
          .attr('x', dims.w + 2);

        d3.selectAll('#tooltipRect_' + mainDivName)
          .attr('width', dims.w + 10)
          .attr('height', dims.h + 20);
      });
      arc.on('mousemove', function () {
        const currentEl = d3.select(this);
        d3.selectAll('#tooltip_' + mainDivName)
          .attr('transform', function () {
            const mouseCoords = d3.mouse(this.parentNode);
            const xCo = mouseCoords[0] + 10;
            const yCo = mouseCoords[1] + 10;
            return 'translate(' + xCo + ',' + yCo + ')';
          });
      });
      arc.on('mouseout', function () {
        const currentEl = d3.select(this);
        currentEl.attr('style', 'fill-opacity:0.85;');
        d3.select('#tooltip_' + mainDivName)
          .style('opacity', () => 0);
        d3.select('#tooltip_' + mainDivName).attr('transform', () => {
          const x = -500;
          const y = -500;
          return 'translate(' + x + ',' + y + ')';
        });
      });

      const tooltipg = pieChart.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 14)
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
        .style('font-size', 14)
        .style('font-family', 'arial')
        .text(() => '');
    };
    drawDashboard(parsedData);
  });
});
