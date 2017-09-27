angular.module('mm.addons.supervisor')
    .factory('$supervisor', function($mmSite, $http, $window, $mmApp, $window) {
        return {
            userType: function() {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.usertype&wstoken=' + $mmSite.getToken()
                });
            },
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
            courses: function(cid, tid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.getteacher&teacherid='+ tid +'&collegeid='+ cid +'&wstoken=' + $mmSite.getToken()
                });
            },
            syllabus: function(tid, cid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.syllabus&teacherid='+ tid +'&courseid='+ cid +'&wstoken=' + $mmSite.getToken()
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
            schedule: function(tid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.schedule&teacherid='+ tid +'&wstoken=' + $mmSite.getToken()
                });
            },
            addVisit: function(sid,date,notify,note){
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.addvisit&scheduleid='+ sid +'&date='+ date +'&notify='+ notify +'&note='+ note +'&wstoken=' + $mmSite.getToken()
                });
            },
            attendance: function(divid, sessionid, teacherid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.studentattendance&divid='+ divid +'&sessionid='+ sessionid +'&teacherid='+ teacherid +'&wstoken=' + $mmSite.getToken()
                });
            },
            addNote: function(lecture_id, note) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.addlecturenote&lecture_id='+ lecture_id +'&note='+ note +'&wstoken=' + $mmSite.getToken()
                });
            },
            grades: function(groupid, courseid) {
                return $http({
                    method: 'GET',
                    url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=supervisor.studentgrades&groupid='+ groupid +'&courseid='+ courseid +'&wstoken=' + $mmSite.getToken()
                });
            },
            isAvailable: function () {
                return this.userType()
                    .then(function (response) {
                        for (var prop in response.myroles) {
                          if (response.myroles.hasOwnProperty(prop)) {
                            if (response.myroles[prop].shortname == 'educational_supervisor') {
                                return true;
                            }
                          } 
                        }
                    }).catch(function() {
                        return false;
                    });
                
            }
        }
    });
