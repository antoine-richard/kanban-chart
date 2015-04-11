var _ = require('lodash');

module.exports = /* @ngInject */ function($scope, workService) {

  workService.get().then(function(work) {
    $scope.pastDays = work;
  });

  $scope.add = function() {
    workService.add($scope.today);
  };

  $scope.remove = function(id) {
    workService.remove(id);
  };

};