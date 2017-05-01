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
        self.isAvailable = function() {
            return true;
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
        self.call = function (service) {
            return $http.get(siteUrl + '/local/ajax/mobile.php?s=' + service).then(function (response) {
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
            return self.call('general.latestnews')
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