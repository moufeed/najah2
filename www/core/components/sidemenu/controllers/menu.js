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

angular.module('mm.core.sidemenu')

/**
 * Controller to handle the side menu.
 *
 * @module mm.core.sidemenu
 * @ngdoc controller
 * @name mmSideMenuCtrl
 */
.controller('mmSideMenuCtrl', function($scope, $state, $mmSideMenuDelegate, $mmSitesManager, $mmSite, $mmEvents,
            $timeout, $rootScope, mmCoreEventLanguageChanged, mmCoreEventSiteUpdated, $mmSideMenu, $mmCourses, $http) {

    $mmSideMenu.setScope($scope);
    $scope.handlers = $mmSideMenuDelegate.getNavHandlers();
    $scope.areNavHandlersLoaded = $mmSideMenuDelegate.areNavHandlersLoaded;
    loadSiteInfo();

    $rootScope.$watch('currentLang', function(newValue, oldValue) {
        if (newValue == 'en') {
            $scope.mainSide = 'left';
            $scope.secSide = 'right';
        } else if (newValue == 'ar') {
            $scope.mainSide = 'right';
            $scope.secSide = 'left';
        }
    });

    $scope.logout = function() {
        $mmSitesManager.logout().finally(function() {
            $mmSitesManager.deleteSite($mmSite.getId());
            // $state.go('mm_login.sites');
            $state.go('mm_login.logoutNoor');
        });
    };
    /**
     * site logout
     *  key mjlog
     */
      $scope.sitelogout = function (){
           $mmSitesManager.setSiteLoggedOut($mmSite.getId(),true).finally(function(res){
                $mmSitesManager.deleteSite($mmSite.getId());
               // $state.go('mm_login.reconnect');
               $state.go('mm_login.logoutNoor');
           });
      };
    function loadSiteInfo() {
        var config = $mmSite.getStoredConfig();

        $scope.siteinfo = $mmSite.getInfo();
        $scope.logoutLabel = 'mm.sidemenu.' + (config && config.tool_mobile_forcelogout == "1" ? 'logout': 'changesite');
        $scope.showMyCourses = !$mmCourses.isMyCoursesDisabledInSite();
        $scope.showWeb = !$mmSite.isFeatureDisabled('$mmSideMenuDelegate_website');
        $scope.showHelp = !$mmSite.isFeatureDisabled('$mmSideMenuDelegate_help');

        $mmSite.getDocsUrl().then(function(docsurl) {
            $scope.docsurl = docsurl;
        });

        $mmSideMenu.getCustomMenuItems().then(function(items) {
            $scope.customItems = items;
        });
    }

    function updateSiteInfo() {
        // We need to use $timeout to force a $digest and make $watch notice the variable change.
        $scope.siteinfo = undefined;
        $timeout(function() {
            loadSiteInfo();
        });
    }

    var langObserver = $mmEvents.on(mmCoreEventLanguageChanged, updateSiteInfo);
    var updateSiteObserver = $mmEvents.on(mmCoreEventSiteUpdated, function(siteid) {
        if ($mmSite.getId() === siteid) {
            updateSiteInfo();
        }
    });

    $scope.$on('$destroy', function() {
        if (langObserver && langObserver.off) {
            langObserver.off();
        }
        if (updateSiteObserver && updateSiteObserver.off) {
            updateSiteObserver.off();
        }
    });
});
