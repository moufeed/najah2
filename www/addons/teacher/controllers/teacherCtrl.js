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
 * Controller to handle teacher section
 *
 * @module mm.core.mmaTeacherCtrl
 * @ngdoc controller
 * @name mmaTeacherCtrl
 */
.controller('mmaTeacherCtrl', function($scope, $q, $mmDB, $stateParams, $state, $mmaTeacherHelper, $log, $sce, $mmSite, $mmUtil, $ionicModal, $mmApp, $ionicPopover, $window, $rootScope) {
    $scope.isOnline = $mmApp.isOnline();

    if( $window.localStorage[$mmSite.getToken()] != 'undefined' && $window.localStorage[$mmSite.getToken()]){
        $rootScope.multiRole = true;
    } else {
        $rootScope.multiRole = false;
    }

    $ionicPopover.fromTemplateUrl('addons/teacher/templates/switch_role.html', {
        scope: $scope
    }).then(function(po) {
        popover = po;

        $scope.switchRotle = function(event) {
            popover.show(event);
        };

        $scope.selectRole = function() {
          popover.hide();
        }
    });

    $scope.initialSlide = function() {
        var date = new Date();
        var day = date.getDay();
        if (day == 5 || day == 6) return 1;
        else return day;
    }

    /**
     * Teacher Courses
     */
    $mmaTeacherHelper.layout()
        .then(function(response) {
            if (response.list.data) {
                $scope.widgets = JSON.parse(response.list.data);
            }
        });

    /**
     * Teacher Courses
     */
    $mmaTeacherHelper.getCourses()
        .then(function(response) {
            $scope.courses = response.list;
        })
        .finally(function() {
            $scope.myCourses.noData = true;
        });

    /**
     * Daily Schedule
     */
    $mmaTeacherHelper.getDailySchedule()
        .then(function(response) {
            $scope.lessons = response.list;
        })
        .finally(function() {
            $scope.Dlessons.noData = true;
            $scope.lessonMaxItems = 5;
        });

    /**
     * Weekly Schedule
     */
    $mmaTeacherHelper.getWeeklySchedule()
        .then(function(response) {
            $scope.weeklySchedule = response.list;
        })
        .finally(function() {
            $scope.wlessons.noData = true;
        });

    /**
     * Daily Attendance
     */
    $mmaTeacherHelper.getDailyAttendance()
        .then(function(response) {
            angular.forEach(response.list, function(val, key) {
                val.chartlabels = [];
                val.chartdata = [];
                val.chartcolors = ['#8BC34A', '#F44336', '#FFEB3B', '#03A9F4'];
                val.chartnums = [];
                angular.forEach(val.counts, function(v, k) {
                    val.chartlabels.push(k);
                    val.chartdata.push(v.percent);
                    val.chartnums.push(v.num);
                });
            });
            $q.all(response.list).then(function() {
                $scope.dailyattendance = response.list;

            });
        })
        .finally(function(data) {
            $scope.Dlessons.noData = true;
        });
    /**
     * latest News
     */
    $mmaTeacherHelper.getFeeds()
        .then(function(response) {
            $scope.feeds = response.list;
        })
        .finally(function(data) {
            $scope.lnews.noData = true;
        });


    $scope.openNews = function(post) {
        $scope.post = post;
        $ionicModal.fromTemplateUrl('addons/teacher/templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            modal.show();
        });
    }

    /**
     * calender
     */
    /*  $mmaTeacherHelper.getCalender() 
        .then(function(data){
            $scope.mCalendar = $sce.trustAsHtml(data.mini);
        })
      .finally(function(data){
          $scope.lcalendar.noData = true;
      });*/
});