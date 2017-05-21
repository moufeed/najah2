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

angular.module('mm.addons.customcourses')

.factory('$mmaCustomCourses', function($log, $q, $mmSite, $http) {

    $log = $log.getInstance('$mmaStudentRecords');

    var self = {};

    var token = $mmSite.getToken();


    self.isAvailable = function() {
        return true;
    };

    self.courses = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.currentcourses&wstoken=' + $mmSite.getToken()
        });
    };

    self.badges = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.badges&wstoken=' + $mmSite.getToken()
        });
    };

    self.weeklyTasks = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.weeklytasks2&wstoken=' + $mmSite.getToken()
        });
    };

    self.points = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.points&wstoken=' + $mmSite.getToken()
        });
    };

    return self;
});