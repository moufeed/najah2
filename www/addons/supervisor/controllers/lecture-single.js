angular.module('mm.addons.supervisor')
    .controller('mmaLectureViewSingleCtrl', function($mmUtil, $supervisor, $stateParams, $sce) {
        var self = this;
        this.data = $stateParams.data;
        self.lecData = $stateParams.lecData;
        self.lecId = $stateParams.id;
        this.renderHtml = function(html) {
        	return $sce.trustAsHtml(html);
        }

        self.newNote = null;

        this.addNote = function(note) {
        	if (note) {
        		var loading = $mmUtil.showModalLoading('mma.supervisor.loading', true);
	            $supervisor.addNote(self.lecId, note).then(function(res) {
	                loading.dismiss();
	                if (res.data){
	                    self.newNote = res.data.supervisor_note;
	                    $mmUtil.showToast('mma.supervisor.success', true, 1000);
	                }
	            }, function(reject) {
	                loading.dismiss();
	                $mmUtil.showToast('mma.supervisor.failed_to_load_data', true, 1000);
	            });
        	}
        }
    });