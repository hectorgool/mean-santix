'use strict';

/*
angular.module('mean.items').controller('ItemsController', ['$scope', 'Global', 'Items',
  function($scope, Global, Items) {
    $scope.global = Global;
    $scope.package = {
      name: 'items'
    };
  }
]);
*/

angular.module('mean.items').controller('ItemsController', ['$scope', '$stateParams', '$location', 'Global', 'Items', 'MeanUser',
	function($scope, $stateParams, $location, Global, Items, MeanUser) {


	    $scope.global = Global;
	    
	    $scope.hasAuthorization = function(item) {
	    	if (!item || !item.user) return false;
	      	return MeanUser.isAdmin || item.user._id === MeanUser.user._id;
	    };

	    $scope.create = function(isValid) {
	    	if (isValid) {

		        var item = new Items({
		        	title: this.title,
		          	content: this.content
		        });

		        item.$save(function(response) {
		        	$location.path('items/' + response._id);
		        });

		        this.title = '';
		        this.content = '';
	      	} 
	      	else {
	        	$scope.submitted = true;
	      	}
	    };

	    $scope.remove = function(item) {

	    	if (item) {
		    	item.$remove(function(response) {

		        	for (var i in $scope.items) {
		            	if ($scope.items[i] === item) {
			      			$scope.items.splice(i,1);
		            	}
		          	}
		          	$location.path('items');

		        });
	    	}
	    	else {
	        	$scope.item.$remove(function(response) {
	          		$location.path('items');
	        	});
	      	}
	    };

	    $scope.update = function(isValid) {
	    	if (isValid) {
		        var item = $scope.item;
		        if(!item.updated) {
		        	item.updated = [];
			    }

		        item.updated.push(new Date().getTime());

		        item.$update(function() {
		        	$location.path('items/' + item._id);
		        });
	      	} 
	      	else {
	        	$scope.submitted = true;
	      	}
	    };

	    $scope.find = function() {

	    	Items.query(function(items) {
	        	$scope.items = items;
	      	});

	    };

	    $scope.findOne = function() {

	    	Items.get({
	        	itemId: $stateParams.itemId
	      	}, function(item) {
	        	$scope.item = item;
	      	});

	    };

	    
	}
]);
