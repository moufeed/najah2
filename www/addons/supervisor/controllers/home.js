angular.module('mm.addons.supervisor')
    .controller('mmaSupervisorCtrl', function($supervisor, $sce, $scope, $ionicPopover, $rootScope, $window, $mmSite) {
        var self = this;
        this.dataLoaded = false;
        $supervisor.colleges().then(function(res) {
            self.data = res.data.list;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        $rootScope.renderHtml = this.renderHtml = $scope.renderHtml = function(html) {
        	return $sce.trustAsHtml(html);
        }
        $ionicPopover.fromTemplateUrl('addons/supervisor/templates/switch_role.html', {
            scope: $scope
        }).then(function(po) {
            popover = po;
            $scope.switchRotle = function(event) {
                popover.show(event);
            };

            $scope.selectRole = function() {
              popover.hide();
            }
        });

        if($window.localStorage[$mmSite.getToken()] != 'undefined'){
            var user = JSON.parse($window.localStorage[$mmSite.getToken()]);
            if (user.roles.length > 1) {
                $scope.multiRole = true;
                $scope.roles = user.roles;
            }
        } else {
            $scope.multiRole = false;
        }
    });