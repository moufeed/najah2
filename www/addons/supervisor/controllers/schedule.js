angular.module('mm.addons.supervisor')
    .controller('mmasupervisorScheduleCtrl', function($supervisor, $stateParams, $scope, $ionicModal, $mmUtil, $timeout) {
        var self = this;
        this.dataLoaded = false;
        self.tid = $stateParams.teacher.sisid;
        var schedule = [];
        $supervisor.schedule($stateParams.id).then(function(res) {
            if (res.data.list){
                $scope.schedule_max = res.data.max_sess;
                    for (i in res.data.list){
                        schedule.push({
                                dayname : res.data.list[i].dayname,
                                divisions : [],
                                isToday: false || res.data.list[i].isToday
                            })
                    for (j =1; j <= parseInt(res.data.max_sess); j++){
                        if(res.data.list[i].data[j]){
                            schedule[i].divisions.push(res.data.list[i].data[j])
                        }else{
                            schedule[i].divisions.push({})
                        }
                    }
                }
                $scope.schedule = schedule;
            }


        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

        $scope.Utils = {
            keys: Object.keys, // ex Utils.keys(obj).length
            typeof: function (val) {
                return typeof val;
            }
        }

        $ionicModal.fromTemplateUrl('addons/supervisor/templates/partials/add-visit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(AddVisitModal) {
            $scope.AddVisitModal = AddVisitModal;
        });

        $ionicModal.fromTemplateUrl('addons/supervisor/templates/partials/attendance.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(AttendanceModal) {
            $scope.AttendanceModal = AttendanceModal;
        });

        $scope.openAddModal = function(cls,day) {
            $scope.cls = cls;
            $scope.day = day;
            $scope.AddVisitModal.show();
        };

        $scope.closeAddModal = function() {
            $scope.AddVisitModal.hide();
        };

        $scope.openAttModal = function(cls) {
            var loading = $mmUtil.showModalLoading('mma.supervisor.loading', true);
            $supervisor.attendance(cls.data.divid, cls.sessionid, self.tid).then(function(res) {
                loading.dismiss();
                if (res.data.data.length){
                    $scope.attData = res.data.data;
                    $scope.AttendanceModal.show();
                } else {
                    $mmUtil.showToast('mma.supervisor.no_data', true, 1000);
                }
            }, function(reject) {
                loading.dismiss();
                $mmUtil.showToast('mma.supervisor.failed_to_load_data', true, 1000);
            });
        };

        $scope.closeAttModal = function() {
            $scope.AttendanceModal.hide();
        };

        $scope.add = function(visit, id) {
            var loading = $mmUtil.showModalLoading('mma.supervisor.adding', true);
            $supervisor.addVisit(id, visit.date, visit.notify || null, visit.notes || null).then(function(res) {
                if (res.data.list) {
                    loading.dismiss();
                    $mmUtil.showToast('mma.supervisor.visit_added', true, 1000);
                    $timeout(function() {
                        $scope.closeAddModal();
                    }, 1000);
                }
            });
        };

    });

angular.module('mm.addons.supervisor')
    .filter('range', function() {
        return function(input, total) {
          total = parseInt(total);
      
          for (var i=0; i<total; i++) {
            input.push(i);
          }  
          return input;
        };
      })

    .filter('rangeReverse', function() {
        return function(input, total) {
          total = parseInt(total);
      
          for (var i=total; i> 0; i--) {
            input.push(i);
          }  
          return input;
        };
    })