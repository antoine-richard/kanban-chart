require('angular/angular');

angular
.module('cfd', [])

.factory('workData', require('./work/data'))
.controller('CfdCtrl', require('./controllers/input'))
.directive('kcCfd', require('./diagram/directive'))
;