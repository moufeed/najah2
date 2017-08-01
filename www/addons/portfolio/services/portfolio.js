angular.module('mm.addons.portfolio')
    .factory('$portfolio', function($mmSite, $http, $window, $mmApp) {
        return {
            getType: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.usertype&wstoken=' + $mmSite.getToken()
                });
            },
            items: function(catId) {
                var id = 0;
                if (catId)
                    id = catId;
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=eportfolio.artifacts&category_id=' + id + '&wstoken=' + $mmSite.getToken()
                });
            },
            cv: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=eportfolio.mycv&wstoken=' + $mmSite.getToken()
                });
            },
            views: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=eportfolio.myviews&wstoken=' + $mmSite.getToken()
                });
            },
            view: function(uId, vId) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=eportfolio.view_details&access=id/' + uId + '-' + vId + '&wstoken=' + $mmSite.getToken()
                });
            },
            isAvailable: function(siteId) {
                siteId = siteId || $mmSite.getId();
                if( $window.localStorage[siteId] != 'undefined' && ($window.localStorage[siteId] == 'sisstudent' || $window.localStorage[siteId] == 'sisteacher')){
                    return true;
                }
                else if($mmApp.isOnline()){
                        return this.getType().then(function(res) {
                            if (res.data.usertype === 'sisstudent' || res.data.usertype === 'sisteacher') {
                                $window.localStorage[siteId] = res.data.usertype;
                                    return true;
                            }
                            return false;
                        });
                    }
                return false;
            }
        }
    });