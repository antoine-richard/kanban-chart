module.exports = function() {
  return {
    restrict: 'EA',
    scope: {
      data: '='
    },
    link: require('./link')
  };
};