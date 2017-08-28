angular.module('mm.addons.supervisor')
    .controller('mmaVisitsCtrl', function($supervisor, $stateParams) {
        var self = this;
        this.dataLoaded = false;

        $supervisor.visits($stateParams.tid, $stateParams.cid).then(function(res) {
            // self.visits = res.data;
            self.visits =[{
	                id : 1 ,
	                name : "School Manager",
	                visit_grade :" 15",
	                note :"",
	                yearid :"1",
	                divisionname :"First Intermediate",
	                date :"Nov 27, 2016"
                },{
	                id : "1" ,
	                name : "School Manager",
	                visit_grade :"100",
	                note :"note", 
	                yearid :"1",
	                divisionname :"First Intermediate",
	                date :" Apr 20, 2017"
        		}
        	];
        	console.log(self.visits);
        }, function(reject) {

        }).finally(function() {
            self.dataLoaded = true;
        });

         

    });