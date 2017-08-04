angular.module('mm.addons.helpdisk')
    .controller('mmaHelpDiskCtrl', function($helpdisk, $mmaFiles, $mmUtil, $mmaFilesHelper, $scope, $ionicLoading, $state) {
        var self = this;
        self.profileLoading = true;
        self.user = {};
        $helpdisk.profile().then(function(res) {
        	self.user.email = res.data.user[0].email;
        	self.user.mobile = res.data.user[0].mobile;
        }).finally(function() {
        	self.profileLoading = false;
        });

        self.add = function() {
        	$ionicLoading.show({
			    content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
			});
        	$helpdisk.send(self.user).then(function(res) {
        		if (res.data.success) {
        			self.user = {};
        			$ionicLoading.hide();
        		}
        	})
        }

    });