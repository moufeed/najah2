angular.module('mm.addons.supervisor')
    .controller('mmaLectureCtrl', function($supervisor, $stateParams) {
        var self = this;
        this.dataLoaded = false;
        $supervisor.lectures($stateParams.tid, $stateParams.cid).then(function(res) {
            self.lectures = res.data;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        $supervisor.visits($stateParams.tid, $stateParams.cid).then(function(res) {
            self.visits = res.data;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

    });