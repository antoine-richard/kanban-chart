var d3 = require('d3');

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: require('./link')
  };
};