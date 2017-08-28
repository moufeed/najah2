angular.module('mm.addons.supervisor')
    .controller('mmaStudentsGradesCtrl', function($ionicModal, $mmUtil, $supervisor, $stateParams, $scope) {
        var self = this;
        this.dataLoaded = false;
        this.cid = $stateParams.cid;
        $supervisor.syllabus($stateParams.tid, this.cid).then(function(res) {
            self.data = res.data.course;
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        $ionicModal.fromTemplateUrl('addons/supervisor/templates/partials/grades.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(GradesModal) {
            $scope.GradesModal = GradesModal;
        });

        $scope.openGroup = function(name, id) {
        	$scope.name = name;
        	var loading = $mmUtil.showModalLoading('mma.supervisor.loading', true);
        	$supervisor.grades(id, self.cid).then(function(res) {
        		loading.dismiss();
        		if (res.data) {
        			$scope.grades = res.data;
        		}
	        }, function(reject) {
	        	loading.dismiss();
                $mmUtil.showToast('mma.supervisor.failed_to_load_data', true, 1000);
	        });
            $scope.GradesModal.show();
        };

        $scope.closeGrades = function() {
            $scope.GradesModal.hide();
        };

    });