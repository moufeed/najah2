
angular.module('mm.addons.teacher')
/**
 *   Extract Image Src
 *   @example ng-bind-html="test | extImage:true" || src="{{ test | extImage}}"
 */
.filter('extImage', ['$sce', function($sce){
        return function(string,img) {
           var res,  rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
               res = rex.exec( string );
              return (img) ? $sce.trustAsHtml(res[0]) : res[1];
        };
}]);     
 