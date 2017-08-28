angular.module('mm.addons.supervisor')
    .controller('mmaLecture_viewCtrl', function($stateParams) {
        var self = this;
        this.data = $stateParams.data;
    });