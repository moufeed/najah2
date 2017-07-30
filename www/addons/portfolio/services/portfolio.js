angular.module('mm.addons.portfolio')
    .factory('$portfolio', function($mmSite, $http) {
        return {
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
            }
        }
    });