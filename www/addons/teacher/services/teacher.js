angular.module('mm.addons.teacher')
    /**
     * Service to  
     *
     * @module mm.addons.teacher
     * @name $mmaTeacherHelper
     */
    .factory('$mmaTeacherHelper', function ($q, $log, $mmSite, $mmUtil, $http,$window,$mmApp) {
        $log = $log.getInstance('$mmaTeacherHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
      
        

        /**
         *  siteId = siteId || $mmSite.getId();
          if($mmApp.isOnline()){
                return self.getUserType().then(function(type){
                  return self.goToSiteInitialPage(type);
                });
            }else{
                var type = $window.localStorage[siteId];
                 return self.goToSiteInitialPage(type);
            }
         */
        self.isAvailable = function (siteId) {
                  siteId = siteId || $mmSite.getId();
        if( $window.localStorage[siteId] != 'undefined' && $window.localStorage[siteId] == 'sisteacher'){
            return true;
            }else if($mmApp.isOnline()){
                return self.call({s: 'general.usertype' })
                    .then(function (data) {
                        if (data.usertype.constructor === Array) {
                            var asd = false;
                            for (var i = data.usertype.length - 1; i >= 0; i--) {
                                if (data.usertype[i] === 'parent' || data.usertype[i] === 'sisteacher') {
                                    asd = true;
                                    if ($window.localStorage[siteId] == 'undefined') {
                                        $window.localStorage[siteId] = data.usertype[i];    
                                    } else {
                                        $window.localStorage[$mmSite.getToken()] = 1;
                                    }
                                }
                            }
                            return asd;
                        } else {
                            if (data.usertype === 'sisteacher') {
                                $window.localStorage[siteId] = data.usertype;
                                return true;
                            }
                        }
                        return false;
                    })
                    .catch(function (err) {
                        return false;
                });
            }
            return false;
        };

        self.call = function (service ,url) {
            var reqUrl = url ? url : siteUrl + '/local/ajax/mobile2.php';
           service.wstoken = $mmSite.getToken(); 
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
         * Show Error Connecting To Server
         */
        var alertisShowing = true;

        function showError() {
            if (alertisShowing) {
                $mmUtil.showErrorModal('mma.teacher.errorfailedtoloaddata', true);
                alertisShowing = false;
            }
        }
        /**
         *   Return Courses
         */
        self.getCourses = function () {
            return self.call({s: 'teacher.courses' })
                .then(function (data) {

                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }

        /**
         *   Return Layout
         */
        self.layout = function () {
            return self.call({s: 'general.getlayout' })
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }

        /**
         * Return Schedule
         */
        self.getWeeklySchedule = function () {
            return self.call({s:'teacher.schedule'})
                .then(function (data) {

                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        /**
         * Return Daily Schedule
         */
        self.getDailySchedule = function () {
            return self.call({s:'teacher.todayschedule'})
                .then(function (data) {

                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        /**
         * Return Attendance
         */
        self.getDailyAttendance = function () {
            return self.call({s:'teacher.todayattendance' })
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        self.getFeeds = function(){
            return self.call({s:'general.latestnews' })
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        self.getCalender = function(){
            return self.call({s:'general.calendar' } )
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        return self;
        
    });