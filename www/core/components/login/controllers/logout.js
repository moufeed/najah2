
angular.module('mm.core.login')


.controller('mmlogoutNoorCtrl', function($state, $http, $timeout, $window) {

    
    // setTimeout(function() {
    // 	$state.go('mm_login.credentials');
    // }, 10000);

    $window.goHome = function() {
        $timeout(function () {
            $state.go('mm_login.credentials');
          },1500);
    }

}); //$state.go('mm_login.credentials');