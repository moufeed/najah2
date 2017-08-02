angular.module('mm.addons.helpdisk')
    .controller('mmaHelpDiskCtrl', function($helpdisk, $mmaFiles, $mmUtil, $mmaFilesHelper, $scope) {
        var self = this;
        self.profileLoading = true;
        self.user = {};
        $helpdisk.profile().then(function(res) {
        	self.user.email = res.data.user[0].email;
        	self.user.mobile = res.data.user[0].mobile;
        }).finally(function() {
        	self.profileLoading = false;
        });

        self.addImage = function() {
        	console.error('asd');
	        $mmaFiles.versionCanUploadFiles().then(function(canUpload) {
	        	console.error(canUpload);
	            if (!canUpload) {
	                $mmUtil.showModal('mm.core.notice', 'mma.files.erroruploadnotworking');
	            } else if (!$mmApp.isOnline()) {
	                $mmUtil.showErrorModal('mm.fileuploader.errormustbeonlinetoupload', true);
	            } else {
	                $mmaFilesHelper.selectAndUploadFile().then(function() {
	                    $scope.filesLoaded = false;
	                });
	            }
	        });
	    }
    });