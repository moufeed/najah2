angular.module('mm.addons.teacher')
    /**
     * Service to  
     *
     * @module mm.addons.teacher
     * @name $mmaTeacherHelper
     */
    .factory('$mmaTeacherCourseHelper', function ($q, $log, $mmSite, $mmUtil, $http) {
        $log = $log.getInstance('$mmaTeacherCourseHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
        var siteId = siteId || $mmSite.getId();
        var token  = $mmSite.getToken();

        self.call = function (service, url) {
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
         * Show Error Connecting To Server
         */
        var alertisShowing = true;

        function showError() {
            if (alertisShowing) {
                $mmUtil.showErrorModal('mma.teacher.errorfailedtoloaddata', true);
                alertisShowing = false;
            }
        }

        self.getCourse = function(id){
             return self.call({s:'teacher.syllabus',courseid : id})
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        self.getGroupStudents = function(id,group){
             return self.call({s:'teacher.syllabus',courseid : id,group :group})
                .then(function (data) {
                    return data.course.grades;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
   return self;
    });
   