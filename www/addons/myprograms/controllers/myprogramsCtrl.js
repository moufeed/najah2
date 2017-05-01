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

angular.module('mm.addons.myprograms')

/**
 * Controller for dashboard events settings.
 *
 * @module mm.addons.dashboard
 * @ngdoc controller
 * @name mmadashboardSettingsCtrl
 */
.controller('mmaMyProgramsCtrl', function($scope, $sce, $mmaMyPrograms) {
    var self = this;
    // console.error($mmaMyPrograms.programs());
    self.programsLoaded = false;
    $mmaMyPrograms.programs().then(function(res) {
        self.programs = res.data.list;
    }, function(rej) {

    }).finally(function() {
        self.programsLoaded = true;
    });

});