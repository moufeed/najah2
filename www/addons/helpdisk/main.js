angular.module('mm.addons.helpdisk', [])

.constant('mmaHelpDiskPriority', 200)

.config(function($stateProvider, $mmSideMenuDelegateProvider, mmaHelpDiskPriority) {

    $stateProvider

        .state('site.helpdisk', {
        url: '/helpdisk',
        views: {
            'site': {
                templateUrl: 'addons/helpdisk/templates/home.html',
                controller: 'mmaHelpDiskCtrl',
                controllerAs: '$ctrl'
            }
        }
    });



    $mmSideMenuDelegateProvider.registerNavHandler('mmaHelpDisk', '$mmaHelpDiskHandlers.sideMenuNav', mmaHelpDiskPriority);
})