require('angular/angular');

angular
.module('cfd', [])

.service('workResource', require('./work/resource'))
.factory('workService', require('./work/service'))
.controller('CfdCtrl', require('./controllers/input'))
.directive('kcCfd', require('./diagram/directive'))
;