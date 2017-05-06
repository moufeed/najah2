
angular.module('mm.addons.lastnews')

.filter('trustHtml', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);    