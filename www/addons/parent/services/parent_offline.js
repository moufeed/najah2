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
    .constant('mmaParentOfflineParentStore', 'mma_parent__children')
    .constant('mmaParentOfflineStatistics', 'mma_parent__statistics')
    .constant('mmaParentOfflineCurrentcourses', 'mma_parent__currentcourses')
    .constant('mmaParentOfflineSchedule', 'mma_parent__schedule')
    .constant('mmaParentOfflineLastTrack', 'mma_parent__lasttrack')
    .constant('mmaParentOfflineAttendance', 'mma_parent__attendance')
    .constant('mmaParentOfflineBadges', 'mma_parent__badges')
    .constant('mmaParentOfflineWeeklytasks', 'mma_parent__weeklytasks')
    .constant('mmaParentOfflineChildMessages', 'mma_parent__childmessages')
    .constant('mmaParentOfflineWeeklyattendance', 'mma_parent__weeklyattendance')
    .constant('mmaParentOfflineStamps', 'mma_parent__stamps')
    .config(function ($mmSitesFactoryProvider, mmaParentOfflineBadges, mmaParentOfflineStamps, mmaParentOfflineAttendance, mmaParentOfflineWeeklytasks, mmaParentOfflineWeeklyattendance, mmaParentOfflineParentStore, mmaParentOfflineStatistics, mmaParentOfflineCurrentcourses, mmaParentOfflineSchedule, mmaParentOfflineLastTrack, mmaParentOfflineChildMessages) {
        var stores = [{
                name: mmaParentOfflineParentStore,
                keyPath: 'id'
            }, {
                name: mmaParentOfflineStatistics,
                keyPath: 'id'
            },
            {
                name: mmaParentOfflineCurrentcourses,
                keyPath: ['userid'],
                indexes: [{
                        name: "userid",
                        unique: true
                    },
                    {
                        name: "term"
                    },
                    {
                        name: "idnumber"
                    },
                    {
                        name: "program"
                    },
                    {
                        name: "courses",
                    }
                ]
            },
            {
                name: mmaParentOfflineSchedule,
                keyPath: 'userid',
            },
            {
                name: mmaParentOfflineLastTrack,
                keyPath: 'userid',
            },
            {
                name: mmaParentOfflineAttendance,
                keyPath: 'userid',
            },
            {
                name: mmaParentOfflineBadges,
                keyPath: 'userid',
            },
            {
                name: mmaParentOfflineWeeklytasks,
                keyPath: 'userid'
            },
            {
                name: mmaParentOfflineChildMessages,
                keyPath: 'userid'
            },
            {
                name: mmaParentOfflineWeeklyattendance,
                keyPath: 'userid'
            },
            {
                name: mmaParentOfflineStamps,
                keyPath: 'userid'
            }
        ]
        $mmSitesFactoryProvider.registerStores(stores);
    })
    .factory('$mmaParentOffline', function ($mmSitesManager, $log, $mmSite, $mmApp, $q, mmaParentOfflineParentStore, mmaParentOfflineStatistics) {
        var self = {};
        $log = $log.getInstance('$mmaParentOffline');
        self.getAllData = function (store, siteId) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().getAll(store);
            });
        };
        self.getItemData = function (store, id, siteId) {
            siteId = siteId || $mmSite.getId();
            var key = id;
            key.toString();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().get(store, key);
            });
        };
        self.saveItemData = function (store, item, siteId) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                var db = site.getDb(),
                    entry;
                if (typeof item != "object") {
                    $log.debug('Type of Entry Must Be an Object');
                    return $q.reject();
                }
                return db.insert(store, item).then(function (keyIndex) {
                    return keyIndex;
                });
            });
        };
        self.itemHasData = function (store, id, siteId) {
            return self.getItemData(store, id, siteId).then(function (data) {
                return !!Object.keys(data).length;
            }, function (err) {
                return !!err;
            });
        };
        self.storeHasData = function (store, siteId) {
            return self.getAllData(store, siteId).then(function (data) {
                return !!data.length;
            });
        }
        self.removeItem = function (store, id, siteId) {
            siteId = siteId || $mmSite.getId();
            var key = id;
            key.toString();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().remove(store, key);
            });
        }
        self.removeStoreData = function (store, siteId) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().removeAll(store);
            });
        }
        self.getItemWhere = function (store, index, key, siteId) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function (site) {
                return site.getDb().whereEqual(store, index, key);
            });
        };
        self.itemHasDataWhere = function (store, index, key, siteId) {
            return self.getItemWhere(store, index, key, siteId).then(function (data) {
                return !!Object.keys(data).length;
            });
        }
        return self;
    });