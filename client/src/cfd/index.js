require('angular/angular');

angular
.module('cfd', [])

.factory('work', require('./work'))
.controller('CfdCtrl', require('./controllers/input'))
.directive('kcCfd', require('./diagram/directive'));
