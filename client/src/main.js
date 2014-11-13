require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');

require('./cfd');

angular
.module('app', ['ngRoute', 'ngResource', 'cfd'])
.config(require('./routes'))
;