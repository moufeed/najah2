angular.module('mm.addons.supervisor')
    .controller('mmaCollegeCtrl', function($supervisor, $stateParams) {
        var self = this;
        this.dataLoaded = false;
        $supervisor.teachers($stateParams.id).then(function(res) {
            self.data = res.data;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

    });