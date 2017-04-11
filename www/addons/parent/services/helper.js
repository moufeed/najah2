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
angular.module('mm.addons.parent')
    /**
     * Service to  
     *
     * @module mm.addons.parent
     * @name $mmaParentHelper
     */
    .factory('$mmaParentHelper', function ($q, $log, $mmSite, $mmSitesManager, $mmUser, $mmUtil, $http) {
        $log = $log.getInstance('$mmaParentHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
        self.call = function (service) {
            return $http.get(siteUrl + '/local/ajax/parent.php?s=' + service).then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            })
        }
        // Return list of Children
        self.getChildren = function () {
            return self.call('parent.childs');
        }
        // Return General information about specific child
        // @param  {Number} id -  child id.
        self.getChild = function (id) {
            function findById(list, id) {
                if (typeof list != "object" || typeof id == "undefined") return;
                var res = {};
                for (var i = 0; i < list.length; i++) {
                    if (id == list[i].id) {
                        res = list[i];
                        break;
                    }
                }
                return res;
            }
            var children = self.getChildren();
            return children.then(function (res) {
                return findById(res.list, parseInt(id));
            });
        }
        // return General Statistics about Child
        self.generalStatistics = function (id) {
            return self.call('parent.statistics&userid=' + id);
        }
        // Return Current Courses
        self.currentCourses = function (id) {
            return self.call('parent.currentcourses&userid=' + id);
        }
        //Return Weekly Schedule
        self.getSchedule = function (id) {
            return self.call('parent.schedule&userid=' + id);
        }
        // Return Last Track courses 
        self.getLastTrack = function (id) {
            return self.call('parent.getlasttrackcourses&userid=' + id);
        }
        // Return Attendance
        self.getAttendance = function (id) {
            return self.call('parent.attendance&userid=' + id);
        }
        // Return badges
        self.getBadges = function (id) {
            return self.call('parent.badges&userid=' + id);
        }
        // Return Stamps
        self.getStamps = function (id) {
            return self.call('parent.stamps&userid=' + id);
        }
         //Weekly Attendance
        self.getWeeklyAttendance = function (id) {
            return self.call('parent.weeklyattendance&userid=' + id);
        }
        self.getMessages = function (id) {
            return self.call('parent.messages&userid=' + id);
        }
        self.getweeklytasks = function (id) {
            return self.call('parent.weeklytasks&userid=' + id);
        }
        self.getStamps = function (id) {
            return self.call('parent.stamps&userid=' + id);
        }
        return self;
    });