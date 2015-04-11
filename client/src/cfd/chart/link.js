var d3 = require('d3');
var nv = require('nvd3');

var colors = d3.scale.category20();
 
var keyColor = function(d, i) {
  return colors(d.key);
};

module.exports = function(scope, element, attrs) {

  var chart;

  scope.$watchCollection('data', function() {
    if (scope.data) {

      // TODO:
      // * change the server data model (collection of days)  
      // * here: convert the received scope.data model (server) to nv input data model
      // * test that adding days works
      // * refactor the code bellow (included moving parts to other files)

      if (!chart) {

        nv.addGraph(function() {
         
          chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .showControls(false)
            .x(function(d) {
              return d[0];
            })
            .y(function(d) {
              return d[1];
            })
            .color(keyColor)
            .duration(300);
         
          chart.stacked.style('stack');
         
          chart.xAxis.tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d));
          });
          chart.yAxisTickFormat(d3.format('d'));
         
          d3.select(element[0])
            .data([scope.data])
            //.transition().duration(1000)
            .call(chart);
            /*.each('start', function() {
              setTimeout(function() {
                d3.selectAll('#chart1 *').each(function() {
                  if (this.__transition__)
                    this.__transition__.duration = 1;
                });
              }, 0);
            });*/
         
          nv.utils.windowResize(chart.update);
         
          return chart;

        });

      } else {
        chart.update();
      }

    }
  });
  
};