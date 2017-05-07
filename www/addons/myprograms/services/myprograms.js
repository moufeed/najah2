
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

.constant('mmaMyProgramsEventsStore', 'myprograms_events')

/**
 * Service to handle calendar events.
 *
 * @module mm.addons.calendar
 * @ngdoc service
 * @name $mmaCalendar
 */
.factory('$mmaMyPrograms', function($log,$window,$mmApp, $q, $http, $mmSite) {

    $log = $log.getInstance('$mmaMyPrograms');

    var self = {};

    var token = $mmSite.getToken();
 
    self.isAvailable = function (siteId) {
        siteId = siteId || $mmSite.getId();
        if( $window.localStorage[siteId] != 'undefined' && $window.localStorage[siteId] == 'sisstudent'){
            return true;
        }
        else if($mmApp.isOnline()){
                return self.getType().then(function(res) {
                    if (res.data.usertype === 'sisstudent') {
                        $window.localStorage[siteId] = res.data.usertype;
                            return true;
                    }
                    return false;
                });
            }
 
        return false;
};

    self.getType = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=general.usertype&wstoken=' + $mmSite.getToken()
        });
    };


    self.programs = function() {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.programs&wstoken=' + $mmSite.getToken()
        });
    };

    self.programDetails = function(id) {
        return $http({
            method: 'GET',
            url: $mmSite.getURL() + '/local/ajax/mobile2.php?s=student.programdetails&programid=' + id + '&wstoken=' + token
        });
    };

    return self;
});