angular.module('mm.addons.teacher')
    /**
     * Service to  
     *
     * @module mm.addons.teacher
     * @name $mmaTeacherHelper
     */
    .factory('$mmaTeacherAttendanceHelper', function ($q, $log, $mmSite,  $mmUtil, $http) {
        $log = $log.getInstance('$mmaTeacherAttendanceHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
        var siteId = siteId || $mmSite.getId();
        var token  = $mmSite.getToken();

 
        self.call = function (service) {
            service.wstoken = token ;
            return $http({
                            url: siteUrl + '/local/ajax/mobile2.php' , 
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

        function showError(alertisShowing) {
            if (alertisShowing) {
                $mmUtil.showErrorModal('mma.teacher.errorfailedtoloaddata', true);
                alertisShowing = false;
            }
        }
         
        /**
         * Return Attendance
         */
        self.getAttendance = function(divid,id){
                return self.call({s : 'attendance.attendanceform' , divid : divid ,id :id}) 
                .then(function(data){
                    return data ;
                })
                .catch(function (err) {
                        showError();
                        return false;
                });
        }
        self.postAttendance = function(divid,id,data){
             return self.call({s:'attendance.save', divid : divid ,id :id ,data:data})
                .then(function(data){
                    return data ;
                })
                .catch(function (err) {
                        showError(true);
                        return false;
                });
        }
        return self;
    });
    