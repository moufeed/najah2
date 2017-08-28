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
        .state('site.supervisorSchedule', {
            url: '/schedule/:id',
            params: { teacher: null },
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/schedule.html',
                    controller: 'mmasupervisorScheduleCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorCourse', {
            url: '/courses/:cid/:tid',
            params: { teacher: null },
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/courses.html',
                    controller: 'mmaCourseCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent', {
            url: '/content/:tid/:cid',
            redirectTo: 'site.supervisorContent.syllabus',
            views: {
                'site': {
                    templateUrl: 'addons/supervisor/templates/content.html',
                    controller: 'mmaContentCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent.syllabus', {
            url: '',
            views: {
                'content': {
                    templateUrl: 'addons/supervisor/templates/syllabus.html',
                    controller: 'mmaSyllabusCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent.lecture', {
            url: '',
            views: {
                'content': {
                    templateUrl: 'addons/supervisor/templates/lecture.html',
                    controller: 'mmaLectureCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent.visit', {
            url: '/visit',
            views: {
                'content': {
                    templateUrl: 'addons/supervisor/templates/visit.html',
                    controller: 'mmaVisitsCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent.students_grades', {
            url: '/students_grades',
            views: {
                'content': {
                    templateUrl: 'addons/supervisor/templates/students_grades.html',
                    controller: 'mmaStudentsGradesCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent.lecture.lecture_view', {
            url: '/lecture_view',
            params: { data: null },
            views: {
                'lecture': {
                    templateUrl: 'addons/supervisor/templates/lecture_view.html',
                    controller: 'mmaLecture_viewCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        .state('site.supervisorContent.lecture.lecture_view.single', {
            url: '/single/:id',
            params: { data: null, lecData: null },
            views: {
                'view_lecture': {
                    templateUrl: 'addons/supervisor/templates/lecture_single.html',
                    controller: 'mmaLectureViewSingleCtrl',
                    controllerAs: '$ctrl'
                }
            }
        });


    $mmSideMenuDelegateProvider.registerNavHandler('mmaSupervisor', '$mmaSupervisorHandlers.sideMenuNav', mmaSupervisorPriority);
})

.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });
});