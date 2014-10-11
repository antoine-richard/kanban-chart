require('angular/angular');
require('angular-route/angular-route');

angular.module('app', ['ngRoute'])

.controller('CfdCtrl', require('./cfd/controllers/cfd'))
.factory(   'work',    require('./cfd/services/work'))

.config(function($routeProvider) {
  $routeProvider
    .when('/cfd', { controller : 'CfdCtrl', templateUrl : 'partials/cfd.html' })
    .otherwise(   { redirectTo : '/cfd' });
});