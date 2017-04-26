
angular.module('mm.addons.teacher')

.filter('trustedHtml', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);    