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

    var token = $mmSite.getToken();

    self.profile = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.initialdata&wstoken=' + token
        });
    };

    self.userDetails = function(layout) {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.getcomponents&layout=' + layout + '&wstoken=' + token
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
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.statistics&wstoken=' + token
        });
    };

    self.performance = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.getperformance&wstoken=' + token
        });
    };

    self.courses = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.currentcourses&wstoken=' + token
        });
    };

    self.course = function(id) {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.syllabus&courseid=' + id + '&wstoken=' + token
        });
    };

    self.weeklySchedule = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.schedule&wstoken=' + token
        });
    };

    self.weeklyAttendence = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.weeklyattendance&wstoken=' + token
        });
    };

    self.attendence = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.attendance&wstoken=' + token
        });
    };

    self.news = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.latestnews&wstoken=' + token
        });
    };

    self.lastTrackCourses = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.getlasttrackcourses&wstoken=' + token
        });
    };

    self.badges = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.badges&wstoken=' + token
        });
    };

    self.stamps = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.stamps&wstoken=' + token
        });
    };

    self.weeklyTasks = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.weeklytasks&wstoken=' + token
        });
    };

    self.calendar = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.calendar&wstoken=' + token
        });
    };

    self.feedback = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.feedback&wstoken=' + token
        });
    };

    self.messages = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.messages&wstoken=' + token
        });
    };

    self.gradebook = function(id) {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.gradebook&wstoken=' + token + '&courseid=' + id
        });
    };

    return self;
});