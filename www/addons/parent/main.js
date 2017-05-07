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

angular.module('mm.addons.parent', ['ksSwiper','easypiechart','chart.js'])

.constant('mmaParentPriority', 2000)

.config(function($stateProvider ,$mmSideMenuDelegateProvider ,mmaParentPriority) {

    $stateProvider

    .state('site.parent', {
        url: '/parent',
        views: {
            'site': {
                templateUrl: 'addons/parent/templates/childrenlist.html',
                controller: 'mmaParentCtrl'
            }
        }
    })
     .state('site.child', {
        url: '/children/:id',
        views: {
            'site': {
                templateUrl: 'addons/parent/templates/childpage.html',
                controller: 'mmaChildCtrl'
            }
        }
    });

    $mmSideMenuDelegateProvider.registerNavHandler('mmaParent', '$mmaParentHandlers.sideMenuNav', mmaParentPriority);
})
 
   