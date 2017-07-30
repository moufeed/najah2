angular.module('mm.addons.portfolio')
    .controller('mmaCvCtrl', function($portfolio, $sce) {
        var self = this;

        self.cvLoaded = false;
        $portfolio.cv().then(function(res) {
            self.cv = res.data;
        }).finally(function() {
            self.cvLoaded = true;
        });

        this.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        }
    });