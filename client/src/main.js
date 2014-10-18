require('angular/angular');
require('angular-route/angular-route');

angular.module('app', ['ngRoute'])

.controller('CfdCtrl', require('./cfd/controllers/input'))
.factory('work', require('./cfd/services/work'))
.directive('kcCfd', require('./cfd/directives/chart'))

.config(function($routeProvider) {
  $routeProvider
    .when('/cfd', { controller : 'CfdCtrl', templateUrl : 'partials/cfd.html' })
    .otherwise(   { redirectTo : '/cfd' });
});