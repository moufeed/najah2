angular.module('mm.addons.supervisor')
    .controller('mmaCourseCtrl', function($supervisor, $stateParams) {
        var self = this;
        this.dataLoaded = true;
        this.tid = $stateParams.tid;
        this.cid = $stateParams.cid;

        this.dataLoaded = false;
        $supervisor.courses(this.cid, this.tid).then(function(res) {
            self.data = res.data.courses;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        this.title = $stateParams.teacher;
    });