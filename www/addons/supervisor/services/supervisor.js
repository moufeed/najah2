angular.module('mm.addons.supervisor')
    .factory('$supervisor', function($mmSite, $http, $window, $mmApp) {
        return {
            colleges: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.getcolleges&wstoken=' + $mmSite.getToken()
                });
            },
            teachers: function(id) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.getteachers&collegeid='+ id +'&wstoken=' + $mmSite.getToken()
                });
            },
            lectures: function(tid,cid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.listlectures&teacher_id='+ tid +'&course_id='+ cid +'&wstoken=' + $mmSite.getToken()
                });
            },
            visits: function(tid, cid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.listvisits&teacher_id='+ tid +'&course_id='+ cid +'&wstoken=' + $mmSite.getToken()
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
