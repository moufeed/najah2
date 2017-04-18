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

angular.module('mm.addons.parent')

  /**
   * Controller to handle parent section
   *
   * @module mm.core.mmParentCtrl
   * @ngdoc controller
   * @name mmParentCtrl
   */
  .controller('mmaParentCtrl', function ($scope, $q, $mmDB, $stateParams, $state, $log, $mmSite, $mmaParentHelper, $mmaParentOffline, $mmApp, mmaParentOfflineParentStore) {
    $scope.isOnline = $mmApp.isOnline();
      
    $mmaParentOffline.storeHasData(mmaParentOfflineParentStore).then(function (res) {
      if (res) {
        $mmaParentOffline.getAllData(mmaParentOfflineParentStore).then(function (data) {
          $scope.children = data;
        });
      }

      if ($mmApp.isOnline()) {
        $scope.loadding = true;
        $mmaParentHelper.getChildren(res).then(function (response) {
            $scope.children = response;
          })
          .finally(function () {
            $scope.loadding = false;
            $scope.children.noData = true;
          });

        if (!$mmApp.isOnline() && !res) {
          $mmUtil.showModal('mma.parent.noconnection', 'mma.parent.noconnectionMessage', 4000);
        }
      }
    });

  });