// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.teacher')

    /**
     * Controller to handle teacher attendence section
     *
     * @module mma.teacher.mmaTeacherattendenceCtrl
     * @ngdoc controller
     * @name mmaTeacherattendenceCtrl
     */
    .controller('mmaTeacherattendenceCtrl', function ($scope, $q, $mmDB, $mmUtil, $ionicHistory, $stateParams, $state, $translate, $mmaTeacherAttendanceHelper, $log, $mmSite, $mmApp, $ionicPopup) {
        $scope.state = $stateParams;
         
        $scope.stds = {};


        function mergeData(src1, src2) {
            var tmp = {},
                result = {},
                x = 0;
            for (vr in src1) {
                tmp[x] = src1[vr];
                tmp[x].id = vr;
                x++;
            }
            angular.merge(result, tmp, src2);
            return $q.all(result);
        }
        
         $mmaTeacherAttendanceHelper.getAttendance($stateParams.divId, $stateParams.recId)
            .then(function (response) {
                if (response.list.old_data) {
                    mergeData(response.list.old_data, response.list.users).then(function (res) {
                        response.list.usrs = res;
                        $scope.course = response.list;
                    })
                } else {
                    response.list.usrs = response.list.users;
                    $scope.course = response.list;
                }
            })
            .finally(function () {
                $scope.attendance.noData = true;
            }); 


         
        $scope.showPrompt = function (usr) {
            var $this =  $scope.stds[usr.id];
            $this.note =  usr.note ||  $this.note;
             
            var popup = $ionicPopup.show({
                template: '<textarea ng-model="stds[' + usr.id + '].note" rows="5"></textarea>',
                title: $translate.instant('mma.teacher.notes'),
                subTitle: $translate.instant('mma.teacher.yournotes'),
                scope: $scope,
                buttons: [{
                        text: $translate.instant('mma.teacher.cancel'),
                         onTap: function (e) {
                           $this.note =  usr.note;
                         }
                    },
                    {
                        text: '<b>' + $translate.instant('mma.teacher.save') + '</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            usr.note = $this.note;
                            return  $this ;
                        }
                    }
                ]
            });
        }

        $scope.postAttend = function () {
            var loading = $mmUtil.showModalLoading();
            console.log(' $scope.stds', $scope.stds);
            $mmaTeacherAttendanceHelper.postAttendance($stateParams.divId, $stateParams.recId, $scope.stds)
                .then(function (response) {
                    console.log(response)
                    if (response) {
                        $ionicHistory.goBack();
                    }
                })
                .finally(function () {
                    loading.dismiss();
                });

        }
    });