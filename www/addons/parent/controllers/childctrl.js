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
    .controller('mmaChildCtrl', function ($scope, $stateParams, $state, $log, $mmaParentHelper, $ionicPopup) {
        var self = this;
        $scope.piechartOptions = {
            barColor: '#C9E4CA',
            trackColor: '#466073',
            scaleColor: false,
            lineWidth: 12,
            lineCap: 'round',
            size: 200
        };
        $scope.attendence = {
            data: [],
            labels: [],
            colors: ['#8BC34A', '#F44336', '#FFEB3B', '#03A9F4']
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
        $mmaParentHelper.getChild($stateParams.id).then(function (data) {
            $scope.child = data;
        });
        $mmaParentHelper.generalStatistics($stateParams.id).then(function (stats) {
            $scope.stats = stats;
        });
        $mmaParentHelper.currentCourses($stateParams.id).then(function (courses) {
            $scope.currentCourses = courses.list[0];
            $scope.currentCourses.noData = true;
        });
        $mmaParentHelper.getSchedule($stateParams.id).then(function (res) {
            $scope.weeklyschedule = res.list;
            $scope.weeklyschedule.noData = true;
        });
        $mmaParentHelper.getLastTrack($stateParams.id).then(function (trackCourses) {
            $scope.lasttrack = trackCourses.list[0];
            $scope.lasttrack.noData = true;
            $scope.lasttrack.maxItems = 6;
        });
        $mmaParentHelper.getAttendance($stateParams.id).then(function (data) {
            $scope.attendence.noData = true;
            angular.forEach(data.list, function (value, key) {
                $scope.attendence.data.push(value);
                $scope.attendence.labels.push(key);
            })
        });
        $mmaParentHelper.getBadges($stateParams.id).then(function (res) {
            $scope.badges = res.list;
            $scope.badges.noData = true;
            $scope.badges.maxItems = 5;
        });
        $mmaParentHelper.getWeeklyAttendance($stateParams.id).then(function (res) {
            $scope.weeklyttendence = res.list;
            $scope.weeklyttendence.noData = true;
        });
        $mmaParentHelper.getMessages($stateParams.id).then(function (res) {
            $scope.messages = res.list;
            $scope.messages.noData = true;
            $scope.messages.maxItems = 5;
        });
        $mmaParentHelper.getweeklytasks($stateParams.id).then(function (res) {
            $scope.taskslist = res.list;
            $scope.taskslist.noData = true;
        });
        $mmaParentHelper.getStamps($stateParams.id).then(function (res) {
            $scope.stampslist = res.list;
            $scope.stampslist.noData = true;
        });
    });