angular.module('mm.addons.supervisor')
    .controller('mmaSyllabusCtrl', function($supervisor, $stateParams, $sce) {
        var self = this;
        this.dataLoaded = false;
        this.cid = $stateParams.cid;
        $supervisor.syllabus($stateParams.tid, this.cid).then(function(res) {
            self.data = res.data.course;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        this.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        }

    });