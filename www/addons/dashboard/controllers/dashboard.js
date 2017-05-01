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

angular.module('mm.addons.dashboard')

/**
 * Controller for dashboard events settings.
 *
 * @module mm.addons.dashboard
 * @ngdoc controller
 * @name mmadashboardSettingsCtrl
 */
.controller('mmaDashboardCtrl', function($scope, $mmaDashboard, $mmEvents, $mmSite, $mmUser, $mmaDashboardCommon, $sce, $state) {
    var self = this;
    self.statsLoaded = false;
    self.performanceLoaded = false;
    self.coursesLoaded = false;
    self.scheduleLoaded = false;
    self.weeklyAttendence = false;
    self.calendarLoaded = false;
    self.attendenceLoaded = false;
    self.newsLoaded = false;
    self.lastTrackCoursesLoaded = false;

    $mmaDashboardCommon.stats().then(function(res) {
        self.stats = res.data;
    }, function(reject) {

    }).finally(function() {
        self.statsLoaded = true;
    });

    $mmaDashboardCommon.performance().then(function(res) {
        self.performance = res.data;
    }, function(reject) {

    }).finally(function() {
        self.performanceLoaded = true;
    });

    $mmaDashboardCommon.courses().then(function(res) {
        self.currentCourses = res.data.list[0];
    }, function(reject) {

    }).finally(function() {
        self.coursesLoaded = true;
    });

    $mmaDashboardCommon.weeklySchedule().then(function(res) {
        self.schedule = res.data.list;
        self.schedule.hasData = false;
        for (var i = 0; i < self.schedule.length; i++) {
            if (self.schedule[i].data.length) {
                self.schedule.hasData = true;
                break;
            }
        }
    }, function(reject) {

    }).finally(function() {
        self.scheduleLoaded = true;
    });

    $mmaDashboardCommon.weeklyAttendence().then(function(res) {
        self.attendence = res.data.list;
    }, function(reject) {

    }).finally(function() {
        self.weeklyAttendenceLoaded = true;
    });

    $mmaDashboardCommon.calendar().then(function(res) {
        self.miniCalendar = $sce.trustAsHtml(res.data.mini);
    }, function(reject) {

    }).finally(function() {
        self.calendarLoaded = true;
    });

    $mmaDashboardCommon.attendence().then(function(res) {
        self.chartAttendence = res.data.list;
        self.noChartData = true;
        for (var key in self.chartAttendence) {
            if (self.chartAttendence.hasOwnProperty(key)) {
                if (self.chartAttendence[key]) {
                    self.noChartData = false;
                    break;
                }
            }
        }
    }, function(reject) {

    }).finally(function() {
        self.attendenceLoaded = true;
    });

    $mmaDashboardCommon.news().then(function(res) {
        self.news = res.data.list;
    }, function(reject) {

    }).finally(function() {
        self.newsLoaded = true;
    });

    $mmaDashboardCommon.lastTrackCourses().then(function(res) {
        self.trackCourses = res.data.list[0];
    }, function(reject) {

    }).finally(function() {
        self.lastTrackCoursesLoaded = true;
    });


    self.badgesLoaded = false;
    $mmaDashboardCommon.badges().then(function(res) {
        self.badges = res.data.list;
    }, function(reject) {

    }).finally(function() {
        self.badgesLoaded = true;
    });

    self.stampsLoaded = false;
    $mmaDashboardCommon.stamps().then(function(res) {
        self.stamps = res.data.list;
    }, function(reject) {

    }).finally(function() {
        self.stampsLoaded = true;
    });

    $mmaDashboardCommon.userDetails('home');

    self.weeklyTasksLoaded = false;
    $mmaDashboardCommon.weeklyTasks().then(function(res) {
        self.weeklyTasks = res.data.list;
    }, function(reject) {

    }).finally(function() {
        self.weeklyTasksLoaded = true;
    });

    self.feedbackLoaded = false;
    $mmaDashboardCommon.feedback().then(function(res) {
        self.feedback = res.data.list;
    }, function(reject) {

    }).finally(function() {
        self.feedbackLoaded = true;
    });

    this.options = {
        loop: false,
        effect: 'fade',
        speed: 500,
    };

    $scope.onReadySwiper = function(swiper) {
        swiper.initObservers();
    };

    self.goToCourse = function(id) {
        $state.go('site.dashCourse.syllabus', { id: id });
    };

});