require('angular/angular');
require('angular-route/angular-route');
require('./cfd');

angular
.module('app', ['ngRoute', 'cfd'])
.config(require('./routes'));
