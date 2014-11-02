module.exports = /* @ngInject */ function($scope, work) {

  $scope.pastDays = work.get();
  $scope.today = work.newDay();

  $scope.add = function() {
    work.add($scope.today);
    $scope.today = work.newDay();
  };

  $scope.remove = function(id) {
    work.remove(id);
    $scope.today = work.newDay();
  };

};