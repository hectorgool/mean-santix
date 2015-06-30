'use strict';

angular.module('mean.tmp').controller('TmpController', ['$scope', 'Global', 'Tmp',
  function($scope, Global, Tmp) {
    $scope.global = Global;
    $scope.package = {
      name: 'tmp'
    };
  }
]);
