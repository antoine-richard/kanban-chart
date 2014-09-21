(function() {
  'use strict';

  angular.module('app', ['ngRoute', 'app.cfd'])

  .config(function($routeProvider) {
    $routeProvider
    .when('/cfd', { controller : 'CfdCtrl', templateUrl : 'app/cfd/templates/cfd.html' })
    .otherwise(   { redirectTo : '/cfd' });
  });

}());