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
  .controller('mmaParentCtrl', function ($scope, $ionicPopup, $q, $mmDB, $stateParams, $state, $log, $mmSite, $mmaParentHelper, $mmaParentOffline, $mmApp, mmaParentOfflineParentStore, $ionicPopover, $window, $rootScope, $translate, $timeout) {
    $scope.isOnline = $mmApp.isOnline();

    $scope.callButtonText = $translate.instant('mma.parent.call_to_manager');

    $scope.callLoading = false;

    $scope.callChild = function(e) {
      e.preventDefault();
      $scope.showConfirm();
    };

    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: $translate.instant('mma.parent.are_you_sure_title'),
       template: $translate.instant('mma.parent.are_you_sure_call'),
       cssClass: 'call-child',
       buttons: [{
          text: $translate.instant('mma.parent.cancel'),
          type: 'button-cancel',
          onTap: function(e) {
            return false; 
          }
        },{
          text: $translate.instant('mma.parent.yes'),
          type: 'button-ok',
          onTap: function(e) {
            return true;
          }
        }]
     });

     confirmPopup.then(function(res) {
       if(res) {
        // $parent.callChild()
        $scope.callButtonText = '';
        $scope.callLoading = true;
        $timeout(function() {
          $scope.callButtonText = $translate.instant('mma.parent.call_to_manager');
          $scope.callLoading = false;
        }, 2000);
       }
     });
   };

    if($window.localStorage[$mmSite.getToken()] != 'undefined'){
        var user = JSON.parse($window.localStorage[$mmSite.getToken()]);
        if (user.roles.length > 1) {
            $scope.multiRole = true;
            $scope.roles = user.roles;
        }
    } else {
        $scope.multiRole = false;
    }

    this.renderHtml = $scope.renderHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $ionicPopover.fromTemplateUrl('addons/parent/templates/switch_role.html', {
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