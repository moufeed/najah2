
angular.module('mm.core.login')


.controller('mmlogoutNoorCtrl', function($state) {

    
    // setTimeout(function() {
    // 	$state.go('mm_login.credentials');
    // }, 10000);

    window.goHome = function() {
    	$state.go('mm_login.credentials');
    }

}); 