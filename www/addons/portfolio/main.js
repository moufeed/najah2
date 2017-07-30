angular.module('mm.addons.portfolio', [])

.constant('mmaPortfolioPriority', 500)

.config(function($stateProvider, $mmSideMenuDelegateProvider, mmaPortfolioPriority) {

    $stateProvider

        .state('site.portfolio', {
        url: '/portfolio',
        views: {
            'site': {
                templateUrl: 'addons/portfolio/templates/home.html',
                controller: 'mmaPortfolioCtrl',
                controllerAs: '$ctrl'
            }
        }
    }).state('site.cv', {
        url: '/cv',
        views: {
            'site': {
                templateUrl: 'addons/portfolio/templates/slides/cv.html',
                controller: 'mmaCvCtrl',
                controllerAs: '$ctrl'
            }
        }
    }).state('site.artifact', {
        url: '/artifact/:id',
        views: {
            'site': {
                templateUrl: 'addons/portfolio/templates/slides/artifact.html',
                controller: 'mmaArtifactCtrl',
                controllerAs: '$ctrl'
            }
        }
    }).state('site.views', {
        url: '/views',
        views: {
            'site': {
                templateUrl: 'addons/portfolio/templates/slides/views.html',
                controller: 'mmaViewsCtrl',
                controllerAs: '$ctrl'
            }
        }
    }).state('site.view', {
        url: '/view/:uId/:vId',
        views: {
            'site': {
                templateUrl: 'addons/portfolio/templates/slides/view.html',
                controller: 'mmaViewCtrl',
                controllerAs: '$ctrl'
            }
        }
    });



    $mmSideMenuDelegateProvider.registerNavHandler('mmaPortfolio', '$mmaPortfolioHandlers.sideMenuNav', mmaPortfolioPriority);
})