module.exports = /* @ngInject */ function($scope, workService) {

  workService.get().then(function(work) {
    $scope.pastDays = work;
    $scope.today = workService.newDay();
  });

  $scope.add = function() {
    workService.add($scope.today);
    $scope.today = workService.newDay();
  };

  $scope.remove = function(id) {
    workService.remove(id);
    $scope.today = workService.newDay();
  };

};