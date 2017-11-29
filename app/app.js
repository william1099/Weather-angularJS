
var app = angular.module("myApp", ["ngRoute"]).factory("myFactory", function () {
	
	var myfactory = {
		cuaca:"",
		city:"",
		pressure:"",
		humidity:"",
		description:"",
		icon:"",
		lon:0,
		lat:0
	};



	return {
		
		getData : function() {
			console.log("in");
			
		}
	}
});;