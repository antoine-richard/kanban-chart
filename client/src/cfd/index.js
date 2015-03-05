var angular = require('angular');

var cfd = angular.module('cfd', [])

.service('workResource', require('./work/resource'))
.factory('workService', require('./work/service'))
.controller('CfdCtrl', require('./controllers/input'))
.directive('kcChart', require('./chart'))
;

module.exports = cfd.name;