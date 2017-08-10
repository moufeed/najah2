angular.module('mm.addons.supervisor')
    .controller('mmaSupervisorCtrl', function($supervisor, $sce) {
        var self = this;
        this.dataLoaded = false;
        $supervisor.colleges().then(function(res) {
        	console.log(res);
            self.data = res.data.list;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        this.renderHtml = function(html) {
        	return $sce.trustAsHtml(html);
        }
    });