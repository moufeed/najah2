// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
angular.module('mm.addons.parent')
    /**
     * Controller to handle parent section
     *
     * @module mm.core.mmParentCtrl
     * @ngdoc controller
     * @name mmParentCtrl
     */
    .controller('mmaChildCtrl', function ($mmApp, $mmUtil, $scope, $stateParams, $state, $log, $mmaParentHelper, $ionicPopup, $mmaParentOffline, mmaParentOfflineStamps, mmaParentOfflineWeeklyattendance, mmaParentOfflineWeeklytasks, mmaParentOfflineBadges, mmaParentOfflineAttendance, mmaParentOfflineParentStore, mmaParentOfflineStatistics, mmaParentOfflineCurrentcourses, mmaParentOfflineSchedule, mmaParentOfflineLastTrack, mmaParentOfflineChildMessages) {
        $scope.isOnline = $mmApp.isOnline();
        var self = this;
        $scope.piechartOptions = {
            animate: {
                duration: 1000,
                enabled: true
            },
            barColor: 'rgba(234,234,234,.8)',
            trackColor: '#466073',
            scaleColor: false,
            lineWidth: 12,
            lineCap: 'round',
            size: 200
        };
        var loadingcolors = ['#90a07f', '#cda4a1', '#d8d3a3', '#93b6c5'],
            finalColors = ['#8BC34A', '#F44336', '#FFEB3B', '#03A9F4'];
        $scope.attendence = {
            data: [],
            labels: [],
            colors: finalColors
        };
        $scope.readMsg = function (item) {
            $ionicPopup.alert({
                title: item.firstname + ' ' + item.lastname,
                template: item.msg
            });
        }
        $scope.readStamp = function (item) {
            $ionicPopup.alert({
                cssClass: 'text-center',
                title: item.stampname,
                subTitle: item.course + ' <i class="ion-calendar"></i>  ' + item.date,
                template: item.text
            });
        }
        // Get child information from db
        $mmaParentOffline.getItemData(mmaParentOfflineParentStore, $stateParams.id).then(function (data) {
            $scope.child = data;
        })
        /// General Statistics
        $mmaParentOffline.itemHasData(mmaParentOfflineStatistics, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineStatistics, $stateParams.id).then(function (stats) {
                    $scope.stats = stats;
                })
            }
            if ($mmApp.isOnline()) {
                $scope.loadding = true;
                $mmaParentHelper.generalStatistics($stateParams.id, res).then(function (stats) {
                        if (stats)
                            $scope.stats = stats;
                    })
                    .catch(function (err) {
                        $log.log('erro', err)
                    })
                    .finally(function () {
                        $scope.loadding = false;
                    });
            }
            if (!$mmApp.isOnline() && !res) {
                //$mmUtil.showModal('mma.parent.noconnection', 'mma.parent.noconnectionMessage', 4000);
                $scope.stats = {
                    'badges': '--',
                    'courses': '--',
                    'weeklytasks': '--',
                    'points': '--'
                };
            }
        });
        /**
         * Current Courses
         */
        $mmaParentOffline.itemHasDataWhere(mmaParentOfflineCurrentcourses, 'userid', $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemWhere(mmaParentOfflineCurrentcourses, 'userid', $stateParams.id).then(function (courses) {
                    $scope.currentCourses = courses[0];
                });
            }
            if ($mmApp.isOnline()) {
                $scope.cc_loadding = true;
                $mmaParentHelper.currentCourses($stateParams.id)
                    .then(function (courses) {
                        $scope.currentCourses = courses[0];
                        $scope.piechartOptions.barColor = '#C9E4CA';
                    })
                    .finally(function () {
                        $scope.cc_loadding = false;
                        $scope.currentCourses.noData = true;
                    });
            }
        })
        /**
         *  Weekly schedule
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineSchedule, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineSchedule, $stateParams.id).then(function (data) {
                    $scope.weeklyschedule = data.list;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.ws_loadding = true;
                $mmaParentHelper.getSchedule($stateParams.id)
                    .then(function (data) {
                        $scope.weeklyschedule = data.list;
                    }).finally(function () {
                        $scope.weeklyschedule.noData = true;
                        $scope.ws_loadding = false;
                    });
            }
        });
        /**
         * Last track
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineLastTrack, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineLastTrack, $stateParams.id).then(function (trackCourses) {
                    $scope.lasttrack = trackCourses;
                    $scope.lasttrack.maxItems = 6;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.lt_loadding = true;
                $mmaParentHelper.getLastTrack($stateParams.id)
                    .then(function (data) {
                        $scope.lasttrack = data;
                    })
                    .finally(function () {
                        $scope.lt_loadding = false;
                        $scope.lasttrack.noData = true;
                        $scope.lasttrack.maxItems = 6;
                    });
            }
        });
        /**
         * Attendance
         */
        function attendanceData(data) {
            $scope.attendence.data = [];
            $scope.attendence.labels = [];
            var total = 0;
            angular.forEach(data.list, function (value, key) {
                total += parseInt(value);
            })
            angular.forEach(data.list, function (value, key) {
                var n = (value / total) * 100;
                var percentage = n.toFixed(1);
                $scope.attendence.data.push(percentage);
                $scope.attendence.labels.push(key);
            })
        }
        $mmaParentOffline.itemHasData(mmaParentOfflineAttendance, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineAttendance, $stateParams.id).then(function (data) {
                    attendanceData(data);
                });
            }
            if ($mmApp.isOnline()) {
                $scope.atd_loadding = true;
                $scope.attendence.colors = loadingcolors;
                $mmaParentHelper.getAttendance($stateParams.id)
                    .then(function (data) {
                        attendanceData(data);
                    })
                    .finally(function () {
                        $scope.attendence.colors = finalColors;
                        $scope.atd_loadding = false;
                        $scope.attendence.noData = true;
                    });
            }
        });
        /**
         * Get Badges
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineBadges, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineBadges, $stateParams.id).then(function (data) {
                    $scope.badges = data.list;
                    $scope.badges.maxItems = 5;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.bd_loadding = true;
                $mmaParentHelper.getBadges($stateParams.id)
                    .then(function (data) {
                        $scope.badges = data.list;
                    }).finally(function () {
                        $scope.bd_loadding = false;
                        $scope.badges.noData = true;
                        $scope.badges.maxItems = 5;
                    });
            }
        })
        /**
         * Weekly Attendance 
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineWeeklyattendance, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineWeeklyattendance, $stateParams.id).then(function (data) {
                    $scope.weeklyttendence = data.list;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.wa_loadding = true;
                $mmaParentHelper.getWeeklyAttendance($stateParams.id)
                    .then(function (data) {
                        $scope.weeklyttendence = data.list;
                    }).finally(function () {
                        $scope.wa_loadding = false;
                        $scope.weeklyttendence.noData = true;
                    });
            }
        });
        /**
         * Child Messages  
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineChildMessages, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineChildMessages, $stateParams.id).then(function (data) {
                    $scope.messages = data.list;
                    $scope.messages.maxItems = 5;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.cm_loadding = true;
                $mmaParentHelper.getMessages($stateParams.id)
                    .then(function (data) {
                        $scope.messages = data.list;
                    })
                    .finally(function () {
                        $scope.cm_loadding = false;
                        $scope.messages.noData = true;
                        $scope.messages.maxItems = 5;
                    });
            }
        })
        /**
         * Weekly Tasks  
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineWeeklytasks, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineWeeklytasks, $stateParams.id).then(function (data) {
                    $scope.taskslist = data.list;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.wt_loadding = true;
                $mmaParentHelper.getweeklytasks($stateParams.id)
                    .then(function (data) {
                        $scope.taskslist = data.list;
                    })
                    .finally(function () {
                        $scope.wt_loadding = false;
                        $scope.taskslist.noData = true;
                    });
            }
        });
        /**
         * Stamps
         */
        $mmaParentOffline.itemHasData(mmaParentOfflineStamps, $stateParams.id).then(function (res) {
            if (res) {
                $mmaParentOffline.getItemData(mmaParentOfflineStamps, $stateParams.id).then(function (data) {
                    $scope.stampslist = data.list;
                });
            }
            if ($mmApp.isOnline()) {
                $scope.st_loadding = true;
                $mmaParentHelper.getStamps($stateParams.id)
                    .then(function (data) {
                        $scope.stampslist = data.list;
                    })
                    .finally(function () {
                        $scope.st_loadding = false;
                        $scope.stampslist.noData = true;
                    });
            }
        });
    });