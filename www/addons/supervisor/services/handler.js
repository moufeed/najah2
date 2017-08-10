angular.module('mm.addons.supervisor')
    .factory('$mmaSupervisorHandlers', function($log, $supervisor) {
        $log = $log.getInstance('$mmaSupervisorHandlers');
        var self = {};

        self.sideMenuNav = function() {

            var self = {};

            self.isEnabled = function() {
                return true;
            };

            self.getController = function() {

                return function($scope) {
                    $scope.icon = 'ion-clipboard';
                    $scope.title = 'mma.supervisor.supervisor';
                    $scope.state = 'site.supervisor';
                    $scope.class = 'mma-supervisor-handler';
                };
            };
            return self;
        };
        return self;
    });