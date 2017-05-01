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

angular.module('mm.addons.myprograms', [])


.constant('mmaMyProgramsPriority', 1400)

.config(function($stateProvider, $mmSideMenuDelegateProvider, mmaMyProgramsPriority) {

    $stateProvider
        .state('site.mycusprograms', {
            url: '/myprograms',
            views: {
                'site': {
                    controller: 'mmaMyProgramsCtrl',
                    controllerAs: 'myPrograms',
                    templateUrl: 'addons/myprograms/templates/list.html'
                }
            }
        })
        .state('site.programDetails', {
            url: '/cusprogram/:id',
            views: {
                'site': {
                    controller: 'mmaProgramDetailsCtrl',
                    controllerAs: 'programsDetails',
                    templateUrl: 'addons/myprograms/templates/program.html'
                }
            }
        });

    // Register side menu addon.
    $mmSideMenuDelegateProvider.registerNavHandler('mmaMyProgram', '$mmaMyProgramsHandlers.sideMenuNav', mmaMyProgramsPriority);

});