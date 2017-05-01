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

angular.module('mm.addons.lastnews')

  /**
   * Controller to handle news section
   *
   * @module mm.core.mmalastNewsCtrl
   * @ngdoc controller
   * @name mmalastNewsCtrl
   */
  .controller('mmalastNewsCtrl', function ($scope, $q, $mmDB, $stateParams, $state, $mmUtil, $log, $mmSite, $mmApp,$mmaLastNewsHelper) {
    $scope.isOnline = $mmApp.isOnline();
    getNews();
      function getNews(){
         $mmaLastNewsHelper.getNews()
         .then(function(data){
                $scope.feeds = data.list;
        })
        .finally(function(data){
          $scope.nNews.noData = true;
        });
      }
     


    $scope.doRefresh = function(){
      if($scope.isOnline) getNews();
      else $mmUtil.showToast('mma.lastnews.nointernet', true, 1500);
      $scope.$broadcast('scroll.refreshComplete');
    }
  }); 