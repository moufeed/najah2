angular.module('mm.addons.lastnews')


.directive('mmaPreImg', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			ratio:'@',
			helperClass: '@'
		},
		controller: function($scope) {
			$scope.loaded = false;
			this.hideSpinner = function(){
				$scope.$apply(function () {
					$scope.loaded = true;
				});
			};
		},
		templateUrl: 'addons/lastnews/templates/img-loader.html'
	};
})

.directive('mmaSpinnerOnLoad', function() {
	return {
		restrict: 'A',
		require: '^mmaPreImg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, preImgController) {
			element.on('load', function() {
				preImgController.hideSpinner();
		  });
		}
	};
})
 

;

