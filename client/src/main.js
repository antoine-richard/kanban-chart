require('angular/angular');
require('angular-route/angular-route');

require('./cfd/cfd');
require('./cfd/controllers/cfd');
require('./cfd/services/work');

angular.module('app', ['ngRoute', 'app.cfd'])

.config(function($routeProvider) {
  $routeProvider
  .when('/cfd', { controller : 'CfdCtrl', templateUrl : 'partials/cfd.html' })
  .otherwise(   { redirectTo : '/cfd' });
});
