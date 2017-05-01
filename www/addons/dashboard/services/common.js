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

.factory('$mmaDashboardCommon', function($log, $q, $mmSite, $http) {

    $log = $log.getInstance('$mmaDashboardCommon');

    var self = {};

    self.profile = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=general.initialdata'
        });
    };

    self.userDetails = function(layout) {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=general.getcomponents&layout=' + layout
        });
    };

    self.getCurrentUser = function() {
        var deffered = $q.defer();
        self.userDetails('home').then(function(res) {
            switch (res.data.usertype) {
                case 'sisstudent':
                    deffered.resolve('student');
                    break;
                case 'sisteacher':
                    deffered.resolve('teacher');
                    break;
                case 'sisparent':
                    deffered.resolve('parent');
                    break;
            }
        }, function(res) {
            deffered.reject();
        });
        return deffered.promise;
    };



    self.stats = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.statistics'
        });
    };

    self.performance = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.getperformance'
        });
    };

    self.courses = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.currentcourses'
        });
    };

    self.course = function(id) {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.syllabus&courseid=' + id
        });
    };

    self.weeklySchedule = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.schedule'
        });
    };

    self.weeklyAttendence = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.weeklyattendance'
        });
    };

    self.attendence = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.attendance'
        });
    };

    self.news = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=general.latestnews'
        });
    };

    self.lastTrackCourses = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.getlasttrackcourses'
        });
    };

    self.badges = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.badges'
        });
    };

    self.stamps = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.stamps'
        });
    };

    self.weeklyTasks = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=student.weeklytasks'
        });
    };

    self.calendar = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=general.calendar'
        });
    };

    self.feedback = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=general.feedback'
        });
    };

    self.messages = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile.php?s=general.messages'
        });
    };

    return self;
});