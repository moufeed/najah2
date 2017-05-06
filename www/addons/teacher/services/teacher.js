angular.module('mm.addons.teacher')
    /**
     * Service to  
     *
     * @module mm.addons.teacher
     * @name $mmaTeacherHelper
     */
    .factory('$mmaTeacherHelper', function ($q, $log, $mmSite, $mmUtil, $http) {
        $log = $log.getInstance('$mmaTeacherHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
        var siteId = siteId || $mmSite.getId();
        self.isAvailable = function () {
            return self.call({s: 'general.usertype' })
                .then(function (data) {
                    if (data.usertype === 'sisteacher') {
                         return true;
                    }
                    return false;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
            
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