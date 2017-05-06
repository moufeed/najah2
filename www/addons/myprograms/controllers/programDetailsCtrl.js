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

.controller('mmaProgramDetailsCtrl', function($scope, $mmaMyPrograms, $stateParams) {
    var self = this;
    self.programsDetailsLoaded = false;
    $mmaMyPrograms.programDetails($stateParams.id).then(function(res) {
        self.program = res.data.list;
        $scope.trackId = res.data.list.tracks[0].id;
    }, function(rej) {

    }).finally(function() {
        self.programsDetailsLoaded = true;
    });

    this.changeTrack = function(id) {
        $scope.trackId = id;
    };

});