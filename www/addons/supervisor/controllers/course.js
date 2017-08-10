angular.module('mm.addons.supervisor')
    .controller('mmaCourseCtrl', function($supervisor, $stateParams) {
        var self = this;
        this.dataLoaded = true;
        this.tid = $stateParams.tid;
        this.courses = $stateParams.courses;
        this.teacher = $stateParams.teacher;
    });