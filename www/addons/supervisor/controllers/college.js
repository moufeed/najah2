angular.module('mm.addons.supervisor')
    .controller('mmaCollegeCtrl', function($supervisor, $stateParams, $scope, $ionicModal, $mmSite, $mmaMessages, $timeout, $mmUtil) {
        var self = this;
        this.dataLoaded = false;
        $scope.siteId = $mmSite.getId();
        this.cid = $stateParams.id;
        $supervisor.teachers($stateParams.id).then(function(res) {
            self.data = res.data;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        $ionicModal.fromTemplateUrl('addons/supervisor/templates/partials/message.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function(tech) {
            $scope.teacher = tech;
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.send = function(messageText) {
            var loading = $mmUtil.showModalLoading('mma.supervisor.sending', true);
            $mmaMessages.sendMessageOnline($scope.teacher.id, messageText, $scope.siteId);
            setTimeout(function() {
                loading.dismiss();
            }, 500);
            setTimeout(function() {
                $mmUtil.showToast('mma.supervisor.message_sent', true, 1000);
            }, 500)
            $timeout(function() {
                $scope.closeModal();
            }, 1000);
        }

    });