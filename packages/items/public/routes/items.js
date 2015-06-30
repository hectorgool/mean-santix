'use strict';

/*
angular.module('mean.items').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('items example page', {
      url: '/items/example',
      templateUrl: 'items/views/index.html'
    });
  }
]);
*/
//Setting up route
angular.module('mean.items').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all items', {
        url: '/items',
        templateUrl: '/items/views/list.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('create item', {
        url: '/items/create',
        templateUrl: '/items/views/create.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('edit item', {
        url: '/items/:itemId/edit',
        templateUrl: '/items/views/edit.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('item by id', {
        url: '/items/:itemId',
        templateUrl: '/items/views/view.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      });
  }
]);