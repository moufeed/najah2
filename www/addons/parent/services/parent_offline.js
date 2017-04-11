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

    .constant('mmaParentOfflineParentStore', 'mma_parent_offline_children')

    .config(function ($mmSitesFactoryProvider, mmaParentOfflineParentStore) {

        var stores = [{
            name: mmaParentOfflineParentStore,
            keyPath: ['id','username','email'],
            indexes: [
                { name: 'id' },
                { name: 'username' },
                { name: 'firstname'},
                { name: 'lastname' },
                { name: 'email'},
                { name: 'pic'},
                { name: 'lastlogin'},
                { name: 'gender'},
                { name: 'phone'},
                { name: 'mobile'},
                { name: 'status'},
                { name: 'programs'},
                { name: 'lastprogram'},
                { name: 'tracks'},
                { name: 'lang'}
            ]
        }];
        $mmSitesFactoryProvider.registerStores(stores);
    })


  

    .factory('$mmaParentOffline', function ($mmSitesManager, $log, $mmSite, $mmApp, $q, mmaParentOfflineParentStore) {
        var self = {};
          $log = $log.getInstance('$mmaParentOffline');

            // Return all children
        self.getAllChildren = function (siteId) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().getAll(mmaParentOfflineParentStore);
            });
        };
        // Return Specific Child  
        self.getchild = function (id, siteId) {
            siteId = siteId || $mmSite.getId();

            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().whereEqual(mmaParentOfflineParentStore, 'id', id);
            });
        };

        self.saveChild = function(siteId) {
        siteId = siteId || $mmSite.getId();

        return $mmSitesManager.getSite(siteId,child).then(function(site) {
            var db = site.getDb(),entry;
            var entry = child;
                if (typeof entry != "object") {
                    $log.debug('Type of Entry Must Be an Object ');
                    return $q.reject();
                }
              entry = {
                            "id": child.id,
                            "username": child.username,
                            "firstname": child.firstname,
                            "lastname": child.lastname,
                            "email":child.email,
                            "pic":child.pic,
                            "lastlogin": child.lastlogin,
                            "gender": child.gender ,
                            "phone": child.phone,
                            "mobile": child.mobile,
                            "status": child.status,
                            "programs": child.programs,
                            "lastprogram": child.lastprogram,
                            "tracks": child.tracks,
                            "lang": child.lang
                        };
            return db.insert(mmaParentOfflineParentStore, entry).then(function() {
                return entry;
            });
        });
    };


        return self;
    });
    