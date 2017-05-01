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
.controller('mmaDashboardCourseCtrl', function($scope, $mmaDashboardCommon, $sce, $stateParams, $templateCache) {
    var self = this;
    this.pages = [
        { state: 'site.dashCourse.syllabus', icon: 'syllabus.png', title: 'Syllabus' },
        { state: 'site.dashCourse.calendar', icon: 'calendar.png', title: 'calendar' },
        { state: 'site.dashCourse.quizzes', icon: 'quizzes.png', title: 'quizzes' },
        { state: 'site.dashCourse.assignments', icon: 'assignments.png', title: 'assignments' },
        { state: 'site.dashCourse.forums', icon: 'forums.png', title: 'forums' },
        { state: 'site.dashCourse.resources', icon: 'resources.png', title: 'resources' },
        { state: 'site.dashCourse.evaluating', icon: 'evaluating.png', title: 'evaluating' },
        // {state: 'site.dashCourse.onlineSessions', icon: 'onlineSessions.png', title: 'online Sessions'},
        // {state: 'site.dashCourse.games', icon: 'games.png', title: 'games'},
        // {state: 'site.dashCourse.gradebook', icon: 'gradebook.png', title: 'gradebook'},
        // {state: 'site.dashCourse.badges', icon: 'badges.png', title: 'badges'}
    ];

    self.courseLoaded = false;

    $mmaDashboardCommon.course($stateParams.id).then(function(res) {
        self.course = res.data.course;
    }, function(rej) {

    }).finally(function() {
        self.courseLoaded = true;
    });

    self.calendarLoaded = false;
    $mmaDashboardCommon.calendar().then(function(res) {
        self.miniCalendar = $sce.trustAsHtml(res.data.mini);
    }, function(reject) {

    }).finally(function() {
        self.calendarLoaded = true;
    });
});