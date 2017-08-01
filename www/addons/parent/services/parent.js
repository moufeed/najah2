angular.module('mm.addons.parent')
    /**
     * Service to  
     *
     * @module mm.addons.parent
     * @name $mmaParentHelper
     */
    .factory('$mmaParentHelper', function ($q, $log,$window, $mmSite, $mmSitesManager, $mmUser, $mmUtil, $http, $mmApp, $mmaParentOffline,
        mmaParentOfflineParentStore, mmaParentOfflineStatistics, mmaParentOfflineCurrentcourses, mmaParentOfflineWeeklytasks, mmaParentOfflineSchedule, mmaParentOfflineStamps, mmaParentOfflineWeeklyattendance, mmaParentOfflineLastTrack, mmaParentOfflineBadges, mmaParentOfflineAttendance, mmaParentOfflineChildMessages) {
        $log = $log.getInstance('$mmaParentHelper');
        var siteUrl = $mmSite.getURL();
        var self = {};
      
 
        self.isAvailable = function (siteId) {
                  siteId = siteId || $mmSite.getId();
        if( $window.localStorage[siteId] != 'undefined' && $window.localStorage[siteId] == 'parent'){
            return true;
            }else if($mmApp.isOnline()){
                return self.call({s: 'general.usertype' })
                    .then(function (data) {
                        if (data.usertype === 'parent') {
                            $window.localStorage[siteId] = data.usertype;
                            return true;
                        }
                        return false;
                    })
                    .catch(function (err) {
                        return false;
                });
            }
            return false;
        };

        /**
         *   Return Layout
         */
        self.layout = function () {
            return self.call({s: 'general.getlayout' })
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }

        /**
         * Show Error Connecting To Server
         */
        var alertisShowing = true;

        function showError() {
            if (alertisShowing) {
                $mmUtil.showErrorModal('mma.parent.errorfailedtoloaddata', true);
                alertisShowing = false;
            }
        }
        /**
         * Get data From Server
         */
       

        self.call = function (service ,url) {
            var reqUrl = url ? url : siteUrl + '/local/ajax/mobile2.php';
           service.wstoken = $mmSite.getToken(); 
            return $http({
                url: reqUrl,
                method: "GET",
                params: service
            }).then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            })
        }

        /**
         * Return List of children
         */
        self.getChildren = function (update) {
            return self.call({s:'parent.childs'})
                .then(function (data) {
                    if (update) {
                        $mmaParentOffline.removeStoreData(mmaParentOfflineParentStore);
                    }
                    angular.forEach(data.list, function (val) {
                        $mmaParentOffline.saveItemData(mmaParentOfflineParentStore, val);
                    })
                    return data.list;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        /**
         * Save & Return child Statistics
         */
        self.generalStatistics = function (id, update) {
            return self.call({s:'parent.statistics',userid : id})
                .then(function (data) {
                    if (update)
                        $mmaParentOffline.removeItem(mmaParentOfflineStatistics, id);
                    data.id = id;
                    $mmaParentOffline.saveItemData(mmaParentOfflineStatistics, data);
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        /**
         * Save & Return child Current Courses
         */
        self.currentCourses = function (id) {
            return self.call({s:'parent.currentcourses',userid : id})
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        "name": data.list[0].name,
                        "term": data.list[0].term,
                        "idnumber": data.list[0].idnumber,
                        "program": data.list[0].program,
                        "courses": data.list[0].courses,
                    }
                    $mmaParentOffline.saveItemData(mmaParentOfflineCurrentcourses, entry);
                    return data.list;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        /**
         * Save & Return child   Weekly Schedule
         */
        self.getSchedule = function (id) {
            return self.call({s:'parent.schedule',userid : id})
                .then(function (data) {
                    data.userid = id;
                    $mmaParentOffline.saveItemData(mmaParentOfflineSchedule, data);
                    return data;
                })
                .catch(function (err) {
                    showError();
                    return false;
                });
        }
        /**
         * Save & Return child  Last Track courses 
         */
        self.getLastTrack = function (id) {
            return self.call({s:'parent.getlasttrackcourses',userid : id})
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        "term": data.list[0].term,
                        "idnumber": data.list[0].idnumber,
                        "program": data.list[0].program,
                        "courses": data.list[0].courses,
                    }
                    $mmaParentOffline.saveItemData(mmaParentOfflineLastTrack, entry);
                    return data.list[0];
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                });
        }
        /**
         * Save & Return child  Attendance
         */
        self.getAttendance = function (id) {
            return self.call({s:'parent.attendance',userid : id})
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        'list': data.list
                    };
                    $mmaParentOffline.saveItemData(mmaParentOfflineAttendance, entry);
                    return data;
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                })
        }
        /**
         * Save & Return child  badges
         */
        self.getBadges = function (id) {
            return self.call( {s:'parent.badges',userid : id})
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        'list': data.list
                    };
                    $mmaParentOffline.saveItemData(mmaParentOfflineBadges, entry);
                    return data;
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                });
        }
        // Return Stamps
        self.getStamps = function (id) {
            return self.call({s:'parent.stamps',userid : id});
        }
        /**
         * Save & Return child Weekly Attendance  
         */
        self.getWeeklyAttendance = function (id) {
            return self.call({s:'parent.weeklyattendance',userid : id} )
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        'list': data.list
                    };
                    $mmaParentOffline.saveItemData(mmaParentOfflineWeeklyattendance, entry);
                    return data;
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                });
        }
        /**
         * Save & Return child Messages
         */
        self.getMessages = function (id) {
            return self.call({s:'parent.messages',userid : id})
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        'list': data.list
                    };
                    $mmaParentOffline.saveItemData(mmaParentOfflineChildMessages, entry);
                    return data;
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                });
        }
        /**
         * Save & Return child Weekly Tasks
         */
        self.getweeklytasks = function (id) {
            return self.call({s:'parent.weeklytasks',userid : id})
                .then(function (data) {
                    var count = data.count;
                    var entry = {
                        'userid': id,
                        'list': data.list
                    };
                    $mmaParentOffline.saveItemData(mmaParentOfflineWeeklytasks, entry);
                    return data;
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                })
        }
        /**
         *  Save & Return child Stamps  
         */
        self.getStamps = function (id) {
            return self.call({s:'parent.stamps',userid : id})
                .then(function (data) {
                    var entry = {
                        'userid': id,
                        'list': data.list
                    };
                    $mmaParentOffline.saveItemData(mmaParentOfflineStamps, entry);
                    return data;
                })
                .catch(function (err) {
                    slef.showError();
                    return false;
                })
        }
        return self;
    });