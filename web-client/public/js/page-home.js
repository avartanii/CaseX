/* eslint-disable */
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
    var rawData = data;
    var parsedData = parseData(data);
    var caseStatusKeys = Object.keys(parsedData.caseStatus);
    console.log(parsedData);

    var drawDashboard = function (input) {
      // https://bl.ocks.org/mbostock/3887235

      var total = 0;

      var svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          radius = (Math.min(width, height) / 2) - 20,
          pieChart = svg.append("g").attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");
          histogram = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var color = d3.scaleOrdinal(d3.schemeSet3);

      var pie = d3.pie()
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
      console.log("TOTAL: ", total);

      var arc = pieChart.selectAll(".arc")
          .data(pie(tF))
          .enter().append("g")
            .attr("class", "arc");

      arc.append("path")
            .attr("d", path)
            .attr("id", function(d, i) {
              return "arc-" + i
            })
            .attr("fill", function(d) { return color(d.data.type); })

      arc.append("text")
            .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.35em")
            .text(function(d) { return `${d.data.freq / total * 100}%`; });


      // Many thanks to: http://bl.ocks.org/ChandrakantThakkarDigiCorp/c8ce360f8bc896ffa6c16d30a4cd026b
      // for tooptip and exterior labeling code
      arc.append("text")
            .attr("dx", 30)
            .attr("dy", -5)
            .append("textPath")
            .attr("xlink:href", function(d, i) {
                return "#arc-" + i;
            })
            .text(function(d) {
              switch(d.data.type) {
                case "Investigation Continued":
                    return "IC";
                case "Cleared by Arrest":
                    return "CBA"
                case "Murder-Suicide":
                    return "MS";
                case "Accidental":
                    return "Acc"
                case "Cleared by Arrest":
                    return "CBA"
                case "Cleared Other":
                    return "CO"
                case "Suicide":
                    return "S"
                default:
                    return d.data.type;
              }
            });

            var mainDivName = 'dashboard';

                //CBT:give blinking effect on mouse over
                arc.on("mouseover", function(d) {
                    var currentEl = d3.select(this);
                    // console.log("CURRENT EL", currentEl._groups["0"]["0"].__data__.data.type);
                    currentEl.attr("style", "fill-opacity:1;");
                    var caseStatusVal = currentEl._groups["0"]["0"].__data__.data.type;
                    drawHistogram(caseStatusVal, "bureau");

                    var fadeInSpeed = 120;
                    d3.select("#tooltip_" + mainDivName)
                        .transition()
                        .duration(fadeInSpeed)
                        .style("opacity", function() {
                            return 1;
                        });
                    d3.select("#tooltip_" + mainDivName)
                        .attr("transform", function(d) {
                            var mouseCoords = d3.mouse(this.parentNode);
                            var xCo = mouseCoords[0] + 10;;
                            var yCo = mouseCoords[0] + 10;
                            return "translate(" + xCo + "," + yCo + ")";
                        });
                    d3.selectAll("#tooltipText_" + mainDivName).text("");
                    var yPos = 0;
                    d3.selectAll("#tooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("Case Status:  " + caseStatusVal);
                    var dims = helpers.getDimensions("tooltipText_" + mainDivName);
                    d3.selectAll("#tooltipText_" + mainDivName + " tspan")
                        .attr("x", dims.w + 2);

                    d3.selectAll("#tooltipRect_" + mainDivName)
                        .attr("width", dims.w + 10)
                        .attr("height", dims.h + 20);
                });
                arc.on("mousemove", function(d) {
                    var currentEl = d3.select(this);
                    d3.selectAll("#tooltip_" + mainDivName)
                        .attr("transform", function(d) {
                            var mouseCoords = d3.mouse(this.parentNode);
                            var xCo = mouseCoords[0] + 10;
                            var yCo = mouseCoords[1] + 10;
                            return "translate(" + xCo + "," + yCo + ")";
                        });
                });
                arc.on("mouseout", function(d) {
                    var currentEl = d3.select(this);
                    currentEl.attr("style", "fill-opacity:0.85;");

                    d3.select("#tooltip_" + mainDivName)
                        .style("opacity", function() {
                            return 0;
                        });
                    d3.select("#tooltip_" + mainDivName).attr("transform", function(d, i) {
                        var x = -500;
                        var y = -500;
                        return "translate(" + x + "," + y + ")";
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
                            console.log("error: getDimensions() " + id + " not found.");
                        }
                        return {
                            w: w,
                            h: h
                        };
                    }
                }

                //CBT:tooltips start
                var tooltipg = pieChart.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("text-anchor", "end")
                    .attr("id", "tooltip_" + mainDivName)
                    .attr("style", "opacity:0")
                    .attr("transform", "translate(-500,-500)");

                tooltipg.append("rect")
                    .attr("id", "tooltipRect_" + mainDivName)
                    .attr("x", 0)
                    .attr("width", 120)
                    .attr("height", 80)
                    .attr("opacity", 0.8)
                    .style("fill", "#000000");

                tooltipg
                    .append("text")
                    .attr("id", "tooltipText_" + mainDivName)
                    .attr("x", 30)
                    .attr("y", 15)
                    .attr("fill", "#fff")
                    .style("font-size", 10)
                    .style("font-family", "arial")
                    .text(function(d, i) {
                        return "";
                    });
                //CBT:tooltips end

      var drawHistogram = function (caseStatusVal, xAxis) {
        // console.log('CASE STATUS VAL', caseStatusVal);
        // console.log('rawData', rawData)
        var data = d3.range(1000).map(d3.randomBates(10));
        console.log("DATA", data);
        var checkIfCaseStatus = function (d) {
          return d.caseStatus === caseStatusVal;
        }
        var filtered = rawData.filter(checkIfCaseStatus);
        filtered.forEach((c) => {
          // console.log(c);
        });

    }
    };
    drawDashboard(parsedData);
  });
});
