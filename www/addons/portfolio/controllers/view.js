angular.module('mm.addons.portfolio')
    .controller('mmaViewCtrl', function($portfolio, $sce, $stateParams) {
        var self = this;

        self.viewLoaded = false;
        $portfolio.view($stateParams.uId, $stateParams.vId).then(function(res) {
            self.view = res.data;
        }).finally(function() {
            self.viewLoaded = true;
        });

        this.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        }
    });