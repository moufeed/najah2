
angular.module('mm.core.login')


.controller('mmlogoutNoorCtrl', function($mmSitesManager, $state, $mmSite) {

    
    setTimeout(function() {
    	$mmSitesManager.logout();
    	$state.go('mm_login.credentials');
    }, 5000);

});