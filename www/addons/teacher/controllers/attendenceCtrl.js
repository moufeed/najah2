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
        
        var data = {
            "list": {
                "pgmname": "الثاني المتوسط",
                "crsname": "الرياضيات",
                "divname": "1",
                "session": "6",
                "formstatus": "edit",
                "status": "true",
                "options": {
                    "1": "حاضر",
                    "2": "غائب",
                    "3": "متأخر",
                    "4": "تم الاعتذار"
                },
                "users": [{
                        "id": "300",
                        "name": "أحمد محمود رمضان"
                    },
                    {
                        "id": "301",
                        "name": "أحمد محمود الغانم"
                    },
                    {
                        "id": "302",
                        "name": "أحمد نشأت علي محمد"
                    },
                    {
                        "id": "303",
                        "name": "اليمان محمود الرمضان"
                    },
                    {
                        "id": "304",
                        "name": "تركي عادل العتيبي"
                    },
                    {
                        "id": "305",
                        "name": "سلمان بن فهد الحلافي"
                    },
                    {
                        "id": "306",
                        "name": "سليمان ممدوح الشيخ"
                    },
                    {
                        "id": "307",
                        "name": "عبد الله محمد العمري"
                    },
                    {
                        "id": "308",
                        "name": "عبد الله حميد مجيد جاسم"
                    },
                    {
                        "id": "309",
                        "name": "عبدالرحمن سعد النجار"
                    },
                    {
                        "id": "9359",
                        "name": "alaaaldeen4 alaaaldeen4"
                    }
                ],
                "old_data": {
                    "300": {
                        "status": "1",
                        "note": null,
                        "id": "300"
                    },
                    "301": {
                        "status": "2",
                        "note": null,
                        "id": "301"
                    },
                    "303": {
                        "status": "3",
                        "note": null,
                        "id": "303"
                    },

                    "305": {
                        "status": "4",
                        "note": null,
                        "id": "305"
                    },
                    "306": {
                        "status": "1",
                        "note": null,
                        "id": "306"
                    },

                    "309": {
                        "status": "2",
                        "note": null,
                        "id": "309"
                    },
                    "9359": {
                        "status": "3",

                        "id": "9359"
                    }
                }
            }
        };
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

        // // to remove 
        // if (data.list.old_data) {
        //     mergeData(data.list.old_data, data.list.users).then(function (res) {
        //         data.list.usrs = res;
        //         $scope.course = data.list;
                  
        //     })
        // } else {
        //     $scope.course = data.list;
        // }
  
         $mmaTeacherAttendanceHelper.getAttendance($stateParams.divId, $stateParams.recId)
            .then(function (response) {
                if (data.list.old_data) {
                    mergeData(data.list.old_data, response.list.users).then(function (res) {
                        data.list.usrs = res;
                        $scope.course = data.list;
                    })
                } else {
                    $scope.course = data.list;
                }
            })
            .finally(function () {
                $scope.attendance.noData = true;
            }); 


        $scope.addStatus = function (item) {
            item.status = '';
            item.note = null;
            return 1;
        }
        $scope.showPrompt = function (usr) {
            var popup = $ionicPopup.show({
                template: '<textarea ng-model="stds[' + usr.id + '].note" rows="5">' + usr.note + '</textarea>',
                title: $translate.instant('mma.teacher.notes'),
                subTitle: $translate.instant('mma.teacher.yournotes'),
                scope: $scope,
                buttons: [{
                        text: $translate.instant('mma.teacher.cancel')
                    },
                    {
                        text: '<b>' + $translate.instant('mma.teacher.save') + '</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            return $scope.stds[usr.id];
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