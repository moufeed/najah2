angular.module('mm.addons.portfolio')
    .controller('mmaArtifactCtrl', function($portfolio, $stateParams, $sce) {
        var self = this;
        self.itemsLoaded = false;
        $portfolio.items($stateParams.id).then(function(res) {
            self.items = res.data;
        }).finally(function() {
            self.itemsLoaded = true;
        });
        this.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        }
    });