angular.module('mm.addons.lastnews')
    /**
     * Service to  
     *
     * @module mm.addons.lastnews
     * @name $mmaParentHelper
     */
    .factory('$mmaLastNewsHelper', function ($q, $log, $mmSite, $mmSitesManager, $mmUser, $mmUtil, $http, $mmApp ) {
        $log = $log.getInstance('$mmaLastNewsHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
		var token  = $mmSite.getToken();

         self.isAvailable = function () {
            return self.call({s: 'general.usertype' })
                .then(function (data) {
                    if (data.usertype === 'parent' || data.usertype === 'educational_supervisor'){
                        return false;
                    }
                    return true;
                })
                .catch(function (err) {
                  //  showError();
                    return false;
                });
        };

        /**
         * Show Error Connecting To Server
         */
        var alertisShowing = true;

        function showError() {
            if (alertisShowing) {
                $mmUtil.showErrorModal('mma.parent.errorfailedtoloaddata', true);
                alertisShowing = false;
            }
        }
        /**
         * Get data From Server
         */ 
        self.call = function (service ,url) {
            var reqUrl = url ? url : siteUrl + '/local/ajax/mobile2.php';
           service.wstoken = token; 
            return $http({
                url: reqUrl,
                method: "GET",
                params: service
            }).then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            })
        }

         /**
         *   Return List Of News
         */ 
        self.getNews = function(){
            return self.call({s:'general.news'})
            .then(function(data){
                return data ;
            })
            .catch(function (err) {
                    showError();
                    return false;
            });
        }
         
        return self;
    });