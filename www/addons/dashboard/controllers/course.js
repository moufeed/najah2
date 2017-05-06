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
.controller('mmaDashboardCourseCtrl', function($scope, $mmaDashboardCommon, $sce, $stateParams, $templateCache, $ionicPopover, $mmApp, $mmSite) {
    var self = this;

    var localStorageName = $mmSite.getToken();

    if ($mmApp.isOnline()) {
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

        self.gradebookLoaded = false;
        $mmaDashboardCommon.gradebook($stateParams.id).then(function(res) {
            self.gradebook = res.data.list;
        }, function(reject) {

        }).finally(function() {
            self.gradebookLoaded = true;
        });
    } else {
        self.course = getData('course' + $stateParams.id);
        self.courseLoaded = true;
        self.miniCalendar = null;
        self.calendarLoaded = true;
        self.gradebook = getData('gradebook' + $stateParams.id);
        self.gradebookLoaded = true;
    }

    $scope.saveOff = function() {
        saveData('course' + $stateParams.id, self.course);
        saveData('gradebook' + $stateParams.id, self.gradebook);
        $scope.closePopover();
    };

    function saveData(name, data) {
        if (data) {
            localStorage.setItem(localStorageName + name, JSON.stringify(data));
        } else {
            localStorage.setItem(localStorageName + name, JSON.stringify([]));
        }
    }

    function getData(name) {
        var data = localStorage.getItem(localStorageName + name);
        if (data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    var template = '<ion-popover-view class="dash-pop"><ion-content><div class="list"><div class="item item-button-right">Save Offline<button ng-click="saveOff()" class="button button-positive"><i class="icon ion-ios-cloud-download"></i></button></div></div></ion-content></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });


    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hidden popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });
});