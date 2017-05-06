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

angular.module('mm.addons.studentrecords')

.factory('$mmaStudentRecordsHandlers', function($log, $mmaStudentRecords) {
    $log = $log.getInstance('$mmaStudentRecordsHandlers');

    var self = {};

    self.sideMenuNav = function() {

        var self = {};

        /**
         * Check if handler is enabled.
         *
         * @return {Boolean} True if handler is enabled, false otherwise.
         */
        self.isEnabled = function() {
            return $mmaStudentRecords.isAvailable();
        };

        /**
         * Get the controller.
         *
         * @return {Object} Controller.
         */
        self.getController = function() {

            /**
             * Side menu nav handler controller.
             *
             * @module mm.addons.calendar
             * @ngdoc controller
             * @name $mmaCalendarHandlers#sideMenuNav:controller
             */
            return function($scope) {
                $scope.icon = 'ion-android-checkmark-circle';
                $scope.title = 'mma.studentrecords.myrecords';
                $scope.state = 'site.studentRecords';
                $scope.class = 'mma-academic-handler';
            };
        };

        return self;
    };

    return self;
});