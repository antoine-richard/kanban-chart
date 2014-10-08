angular.module('app.cfd')
.controller('CfdCtrl', function($scope, work) {

  $scope.pastDays = work.get();
  $scope.today = work.newWorkDay();

  $scope.add = function() {
    work.add($scope.today);
    $scope.today = work.newWorkDay();
  };

  $scope.remove = function(id) {
    work.remove(id);
    $scope.today = work.newWorkDay();
  };

});
