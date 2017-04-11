
angular.module('mm.addons.parent')

.filter('trustedHtml', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);    