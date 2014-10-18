var d3 = require('d3')/*,
    _  = require('lodash')*/;

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width  = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.time.scale().range([0, width]);
      var y = d3.scale.linear()/*.domain([0, 0.2])*/ .range([height, 0]);

      var color = d3.scale.category20();
      color.domain(d3.keys(scope.data[0]).filter(function(key) { return key !== "_id"; }));

      var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat('');
      var yAxis = d3.svg.axis().scale(y).orient("left");

      var area = d3.svg.area()
          .x(function(d)  { return x(d._id); })
          .y0(function(d) { return y(d.y0); })
          .y1(function(d) { return y(d.y0 + d.y); });

      var stack = d3.layout.stack().values(function(d) { return d.values; });

      var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      scope.$watchCollection('data', function(data) {

        //data = _.sortBy(data, function(item) { return -item._id; });

        var flow = stack(color.domain().map(function(key) {
          return {
            key: key,
            values: scope.data.map(function(d) {
              return {_id: d._id, y: d[key] / 20 /* ? */};
            })
          };
        }));

        x.domain(d3.extent(scope.data, function(d) { return d._id; }));

        svg.selectAll(".work")
            .data(flow)
            .enter()
              .append("g")
              .attr("class", "work")
                .append("path")
                .attr("class", "area")
                .attr("d", function(d) { return area(d.values); })
                .style("fill", function(d) { return color(d.key); });
        
      });
    }
  };
};