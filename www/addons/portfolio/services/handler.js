angular.module('mm.addons.portfolio')
    .factory('$mmaPortfolioHandlers', function($log, $portfolio) {
        $log = $log.getInstance('$mmaPortfolioHandlers');
        var self = {};

        self.sideMenuNav = function() {

            var self = {};

            self.isEnabled = function() {
                return $portfolio.isAvailable();
            };

            self.getController = function() {

                return function($scope) {
                    $scope.icon = 'ion-clipboard';
                    $scope.title = 'mma.portfolio.portfolio';
                    $scope.state = 'site.portfolio';
                    $scope.class = 'mma-portfolio-handler';
                };
            };
            return self;
        };
        return self;
    });