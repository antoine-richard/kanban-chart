module.exports = /* @ngInject */ function($scope, workData) {

  workData.get().then(function(work) {
    $scope.pastDays = work;
    $scope.today = workData.newDay();
  });

  $scope.add = function() {
    workData.add($scope.today);
    $scope.today = workData.newDay();
  };

  $scope.remove = function(id) {
    workData.remove(id);
    $scope.today = workData.newDay();
  };

};