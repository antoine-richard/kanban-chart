require('angular/angular');

angular
.module('cfd', [])

.controller('CfdCtrl', require('./controllers/input'))
.factory('work', require('./services/work'))
.directive('kcCfd', require('./directives/chart'));
