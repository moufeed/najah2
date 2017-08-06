angular.module('mm.addons.helpdisk')
    .factory('$mmaHelpDiskHandlers', function($log, $helpdisk) {
        $log = $log.getInstance('$mmaPortfolioHandlers');
        var self = {};

        self.sideMenuNav = function() {

            var self = {};

            self.isEnabled = function() {
                return true;
            };

            self.getController = function() {

                return function($scope) {
                    $scope.icon = 'ion-ios-medical';
                    $scope.title = 'mma.helpdisk.title';
                    $scope.state = 'site.helpdisk';
                    $scope.class = 'mma-helpdisk-handler';
                };
            };
            return self;
        };
        return self;
    });