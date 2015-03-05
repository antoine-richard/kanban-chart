var angular = require('angular');

angular
.module('app', [
  require('angular-route'), 
  require('angular-resource'), 
  require('./cfd')
])
.config(require('./routes'))
;