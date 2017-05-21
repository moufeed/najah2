// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
angular.module('mm.addons.teacher')
    /**
     * Controller to handle teacher attendence section
     *
     * @module mma.teacher.mmaTeacherattendenceCtrl
     * @ngdoc controller
     * @name mmaTeacherattendenceCtrl
     */
    .controller('mmaTeachercourseCtrl', function ($scope, $q, $mmUtil, $sce, $stateParams, $mmCourses, $mmaTeacherHelper, $mmaTeacherCourseHelper, $state, $log, $mmSite, $mmApp, $mmaParticipants, $ionicPlatform, mmUserProfileState) {
        var courseid = $stateParams.id;
        $scope.groups = [];
        $scope.clsrooms = [];
        $scope.participants = [];
        $scope.courseid = courseid;
        $scope.userStateName = mmUserProfileState;
        $scope.openUrl = function (url) {
            $mmUtil.openInApp(url);
        }
        /**
         *   
         */
        $scope.openGroup = function (group) {
            var url = group.link + '&group=' + group.id;
            $mmUtil.openInApp(url);
        }

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isSubGroupShown = function (group) {
            return $scope.shownSubGroup === group;
        };
        $scope.toggleSubGroup = function (group) {
            if ($scope.isSubGroupShown(group)) {
                $scope.shownSubGroup = null;
            } else {
                $scope.shownSubGroup = group;
            }
        };
        //-------------------
         $scope.isclsroomShown = function (clss) {
            return $scope.shownClss === clss;
        };
        
        $scope.toggleClsrom = function (clss) {
            if ($scope.isclsroomShown(clss)) {
                $scope.shownClss = null;
            } else {
                $scope.shownClss = clss;
            }
        };
        $scope.isStudentShown = function (std) {
            return $scope.std === std;
        };
        $scope.toggleStudent = function (clss) {
            if ($scope.isStudentShown(clss)) {
                $scope.std = null;
            } else {
                $scope.std = clss;
            }
        };

        function notEmpty(obj) {
            console.log(Object.keys(obj).length) 
            if (typeof obj == "object" && Object.keys(obj).length > 0)
                return true;
            return false;
        }
 
/**
 * get Course Informations
 */
        $mmaTeacherCourseHelper.getCourse(courseid).then(function (data) {
            $scope.course = data.course;
            $scope.WT_NotEmpty = notEmpty(data.course.weeklytasks);
            $scope.QZ_NotEmpty = notEmpty(data.course.quizzes);  
            $scope.FM_NotEmpty = notEmpty(data.course.forums);  

            makeGroup(); 
            makeStamps();
        }).finally(function () {
            $scope.myCourse.noData = true;
            });
        
         
     
        /**
         * grades tab
         */
        function makeGroup() {
            groups = {};
            var deferred = $q.defer();
            var x = 0;
            var crg = $scope.course.grades.currentgroup;
            groups[crg] = {
                id: crg,
                name: $scope.course.grades.groups[crg],
                items: $scope.course.grades.data,
                link: $scope.course.grades.link
            }
            for (grp in $scope.course.grades.groups) {
                if (grp != $scope.course.grades.currentgroup) {
                    groups[grp] = {
                        id: grp,
                        name: $scope.course.grades.groups[grp],
                        items: []
                    }
                    $mmaTeacherCourseHelper.getGroupStudents(courseid, grp).then(function (group) {
                        groups[grp].items = group.data;
                        groups[grp].link = group.link;
                    });
                }
            };
            $q.all(groups).then(function () {
                $scope.groups = groups;
                console.log('--------------------', $scope.groups);
                return $scope.groups;
            });
        }
        /**
         * students tab
         */
        function fetchParticipants(refresh) {
            var firstToGet = refresh ? 0 : $scope.participants.length;
            return $mmaParticipants.getParticipants(courseid, firstToGet).then(function (data) {
                if (refresh) {
                    $scope.participants = data.participants;
                } else {
                    $scope.participants = $scope.participants.concat(data.participants);
                }
                $scope.canLoadMore = data.canLoadMore;
            }, function (message) {
                $mmUtil.showErrorModal(message);
                $scope.canLoadMore = false; // Set to false to prevent infinite calls with infinite-loading.
            });
        }
        // Get first participants.
        fetchParticipants(true).then(function () {
            // Add log in Moodle.
            $mmSite.write('core_user_view_user_list', {
                courseid: courseid
            });
        }).finally(function () {
            $scope.participantsLoaded = true;
        });
        // Load more participants.
        $scope.loadMoreParticipants = function () {
            fetchParticipants().finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        /**
         * stamps tab
         */
        function makeStamps(){
           
            var cls ={};
            for (cl in $scope.course.grades.groups ){
                 cls[cl]={
                        id: cl,
                        name: $scope.course.grades.groups[cl],
                        students: []
                 }
            }
            for(std in $scope.course.stamps){
                $scope.course.stamps[std].id = std;
                cls[$scope.course.stamps[std].groupid].students.push($scope.course.stamps[std]);
            }
            $q.all(cls).then(function () {
                $scope.clsrooms = cls;
            });
        }
    });