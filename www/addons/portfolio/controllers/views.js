angular.module('mm.addons.portfolio')
    .controller('mmaViewsCtrl', function($portfolio, $sce) {
        var self = this;

        self.viewsLoaded = false;
        $portfolio.views().then(function(res) {
            self.views = res.data;
        }).finally(function() {
            self.viewsLoaded = true;
        });

        this.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        }
    });