angular.module('mm.addons.teacher')
    /**
     * Service to  
     *
     * @module mm.addons.teacher
     * @name $mmaTeacherHelper
     */
    .factory('$mmaTeacherHelper', function ($q, $log, $mmSite,  $mmUtil, $http) {
        $log = $log.getInstance('$mmaTeacherHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
        var siteId = siteId || $mmSite.getId();


        self.isAvailable = function() {
            return true; 
        }; 
 
        self.call = function (service) {
            return $http.get(siteUrl + '/local/ajax/teacher.php?s=' + service).then(function (response) {
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
        self.getCourses = function(){
            return self.call('teacher.courses')
            .then(function(data){
               
                return data ;
            })
            .catch(function (err) {
                    showError();
                    return false;
            });
        }
        /**
         * Return Schedule
         */
        self.getWeeklySchedule = function(){
             return self.call('teacher.schedule')
             .then(function(data){
               
                return data ;
            })
            .catch(function (err) {
                    showError();
                    return false;
            });
        }
        /**
         * Return Daily Schedule
         */
        self.getDailySchedule = function(){
                return self.call('teacher.todayschedule')
                .then(function(data){
                
                    return data ;
                })
                .catch(function (err) {
                        showError();
                        return false;
                });
        }
        /**
         * Return Attendance
         */
        self.getDailyAttendance = function(){
                return self.call('teacher.todayattendance')
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