angular.module('mm.addons.helpdisk')
    .factory('$helpdisk', function($http, $mmSite) {
        return {
            profile: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.initialdata&wstoken=' + $mmSite.getToken()
                });
            },
            send: function(data) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=helpdesk.create_ticket&email=' + data.email + '&mobile=' + data.mobile + '&details=' + data.details + '&wstoken=' + $mmSite.getToken()
                });  
            }
        }
    });
