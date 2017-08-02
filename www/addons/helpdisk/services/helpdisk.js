angular.module('mm.addons.helpdisk')
    .factory('$helpdisk', function($http, $mmSite) {
        return {
            profile: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.initialdata&wstoken=' + $mmSite.getToken()
                });
            }
        }
    });