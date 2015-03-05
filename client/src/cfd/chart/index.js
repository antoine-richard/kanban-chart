module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: require('./link')
  };
};