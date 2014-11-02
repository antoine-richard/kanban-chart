module.exports = /* @ngInject */ function($routeProvider) {
  $routeProvider
    .when('/cfd', { controller : 'CfdCtrl', templateUrl : 'partials/cfd.html' })
    .otherwise(   { redirectTo : '/cfd' });
};