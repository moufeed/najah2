angular.module('mm.addons.supervisor')
    .controller('mmaLectureCtrl', function($supervisor, $stateParams, $sce) {
        var self = this;
        this.dataLoaded = false;
        $supervisor.lectures($stateParams.tid, $stateParams.cid).then(function(res) {
            self.data = res.data;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        this.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        }

    });