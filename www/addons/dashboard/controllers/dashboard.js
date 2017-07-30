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
.controller('mmaDashboardCtrl', function($scope, $mmaDashboard, $mmEvents, $mmSite, $mmUser, $mmaDashboardCommon, $sce, $state, $mmApp, $ionicPopover, $q, $ionicModal, $window) {
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

    var localStorageName = $mmSite.getToken();

    $mmaDashboardCommon.layout().then(function(res) {
        if (res.data.list) {
            self.widgets = res.data.list;
        } else {
            self.widgets = [
                { "name": "stats", "active": true, "size": 12, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "performance", "active": true, "size": 12, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "courses", "active": true, "size": 12, "resizeable": true, "sizes": [6, 12] },
                { "name": "schedule", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "weekly-attendance", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "calendar", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 8, 12] },
                { "name": "attendance", "active": true, "size": 6, "resizeable": false, "sizes": [] },
                { "name": "news", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "lasttrack", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "badges", "active": true, "size": 4, "resizeable": true, "sizes": [3, 4] },
                { "name": "stamps", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "weekly-tasks", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] },
                { "name": "messages", "active": true, "size": 6, "resizeable": true, "sizes": [3, 4, 6, 12] }
            ];
        }
    }, function(reject) {

    });



    if ($mmApp.isOnline()) {
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

        self.weeklyTasksLoaded = false;
        $mmaDashboardCommon.weeklyTasks().then(function(res) {
            self.weeklyTasks = res.data;
            self.weeklyTasks.assign = [];
            self.weeklyTasks.quiz = [];
            for (var i = 0; i < self.weeklyTasks.length; i++) {
                if (self.weeklyTasks[i].class == 'quiz') {
                    self.weeklyTasks.quiz.push(self.weeklyTasks[i]);
                } else if (self.weeklyTasks[i].class == 'assign') {
                    self.weeklyTasks.assign.push(self.weeklyTasks[i]);
                }
            }
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
    } else {
        self.stats = getData('stats');
        self.statsLoaded = true;
        self.performance = getData('performance');
        self.performanceLoaded = true;
        self.currentCourses = getData('currentCourses');
        self.coursesLoaded = true;
        self.schedule = getData('schedule');
        self.scheduleLoaded = true;
        self.schedule.hasData = false;
        for (var i = 0; i < self.schedule.length; i++) {
            if (self.schedule[i].data.length) {
                self.schedule.hasData = true;
                break;
            }
        }
        self.attendence = getData('attendence');
        self.weeklyAttendenceLoaded = true;

        self.miniCalendar = null;
        self.calendarLoaded = true;
        self.chartAttendence = getData('chartAttendence');
        self.attendenceLoaded = true;
        self.news = getData('news');
        self.newsLoaded = true;
        self.trackCourses = getData('trackCourses');
        self.lastTrackCoursesLoaded = true;
        self.badges = getData('badges');
        self.badgesLoaded = true;
        self.stamps = getData('stamps');
        self.stampsLoaded = true;
        self.weeklyTasks = getData('weeklyTasks');
        self.weeklyTasksLoaded = true;
        self.feedback = getData('feedback');
        self.feedbackLoaded = true;
    }

    $scope.saveOff = function() {
        saveData('stats', self.stats);
        saveData('performance', self.performance);
        saveData('currentCourses', self.currentCourses);
        saveData('schedule', self.schedule);
        saveData('attendence', self.attendence);
        saveData('miniCalendar', self.miniCalendar);
        saveData('chartAttendence', self.chartAttendence);
        saveData('news', self.news);
        saveData('trackCourses', self.trackCourses);
        saveData('badges', self.badges);
        saveData('stamps', self.stamps);
        saveData('weeklyTasks', self.weeklyTasks);
        saveData('feedback', self.feedback);

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

    //$mmaDashboardCommon.userDetails('home');

    self.options = {
        loop: false,
        effect: 'slide',
        speed: 500,
        pagination: false
    };

    self.openNews = function(post) {
        $scope.post = post;
        $ionicModal.fromTemplateUrl('addons/dashboard/templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            modal.show();
        });
    }

    $scope.onReadySwiper = function(swiper) {
        swiper.initObservers();
    };

    self.goToCourse = function(id) {
        $state.go('site.dashCourse.syllabus', { id: id });
    };

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


})