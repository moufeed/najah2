
angular.module('mm.core.login')


.controller('mmlogoutNoorCtrl', function($state) {

    
    setTimeout(function() {
    	$state.go('mm_login.credentials');
    }, 5000);

});