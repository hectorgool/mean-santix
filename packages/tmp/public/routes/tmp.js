'use strict';

angular.module('mean.tmp').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('tmp example page', {
      url: '/tmp/example',
      templateUrl: 'tmp/views/index.html'
    });
  }
]);
