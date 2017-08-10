angular.module('mm.addons.supervisor', [])

.constant('mmaSupervisorPriority', 500)

.config(function($stateProvider, $mmSideMenuDelegateProvider, mmaSupervisorPriority) {

    $stateProvider

        .state('site.supervisor', {
            url: '/supervisor',
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/home.html',
                    controller: 'mmaSupervisorCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorCollege', {
            url: '/college/:id',
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/college.html',
                    controller: 'mmaCollegeCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorCourse', {
            url: '/courses/:tid',
            params: { courses: null, teacher: null },
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/courses.html',
                    controller: 'mmaCourseCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorLecture', {
            url: '/lecture/:tid/:cid',
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/lecture.html',
                    controller: 'mmaLectureCtrl',
                    controllerAs: '$ctrl'
                }
            }
        });



    $mmSideMenuDelegateProvider.registerNavHandler('mmaSupervisor', '$mmaSupervisorHandlers.sideMenuNav', mmaSupervisorPriority);
})