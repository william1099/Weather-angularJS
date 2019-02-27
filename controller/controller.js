
var controllers = {};
var start = true;

controllers.controller1 = function($scope, $http, $routeParams, myFactory, $interval, $timeout) {
	$scope.header = "JagoanCuaca";
	console.log("masuk1"); console.log(start); console.log(myFactory);
	var apiKey = "<your-openweather-API-key>";
	var apiKey2 = "<your-timezone-API-key";
	var apiKey3 = "<your-wikipedia-API-key>";
	var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];	
	var map;
	
	
		let data2;
		$interval(function() {

			data2 = myFactory.getData();
			$scope.time = {
				timezone:data2.timezone,
				zonename:data2.zonename,
				abbreviation:data2.abbreviation,
				country:data2.country,
				day:data2.day
			};


			$scope.weather = {
				cuaca:data2.cuaca,
				description:data2.description,
				icon:data2.icon,
				temperature:data2.temperature,
				pressure:data2.pressure,
				humidity:data2.humidity,
				city:data2.city,
				lon:data2.lon,
				lat:data2.lat,
				cond:data2.kondisi

			};

			

		}, 1000);

		$timeout(function() {
			
			 map = new google.maps.Map(document.getElementById('map'), {
	 	    center: {lat: data2.lat, lng: data2.lon},
	        zoom: 14
				});
			
		}, 2000);
		



	$scope.about = {
		country:"",
		length:0,
		data:[],
		day:""
	};
	
	$scope.flag = "show";

	$scope.change = function() {
		$scope.flag = "hidden";
	}
	$scope.home = function() {
		$scope.flag = "show";
	}
	$scope.next = function() {
		let rand = $scope.about.data[2][Math.floor(Math.random() * $scope.about.length)];
		while(rand == "") rand = $scope.about.data[2][Math.floor(Math.random() * $scope.about.length)];
		$scope.about.country = rand;
	}

	

	$scope.go = function() {
		let val = document.getElementById("input").value;
		let val2 = document.getElementById("inputt").value;
		val = val.trim();	val2 = val2.trim();
		let val3 = val.replace(/\s+/g, "_");
		val = val.replace(/\s+/g, "%20");
		start = false;

		
		
		$http.get(`https://id.wikipedia.org/w/api.php?action=opensearch&search=${val3}&format=json&origin=*`).then(function(success) {
			console.log(success);
			let rand = success.data[2][0];
			while(rand == "") rand = success.data[2][Math.floor(Math.random() * success.data[2].length)];
			$scope.about.country = rand;
			$scope.about.length = success.data[2].length;
			$scope.about.data = success.data;
		});

		$http.get(`http://api.openweathermap.org/data/2.5/weather?q=${val},${val2}&APPID=${apiKey}`).then(function(success) {
		$http.get(`http://api.timezonedb.com/v2/get-time-zone?key=${apiKey2}&format=json&lat=${success.data.coord.lat}&lng=${success.data.coord.lon}&by=position`).then(function(success2) {
			

			let day = new Date(success2.data.formatted);
			let dday = days[day.getDay()];
			let kondisi = "";
			if ((day.getHours() >= 19 && day.getHours() <= 24) || (day.getHours() >= 0 && day.getHours() <= 4))
				$scope.about.day = "Night";
			else $scope.about.day = "Afternoon";

			myFactory.changeAll(success.data.weather[0].main,success.data.name,success.data.main.pressure,
			 success.data.main.humidity,success.data.weather[0].description,`http://openweathermap.org/img/w/${success.data.weather[0].icon}.png`,
			 success.data.coord.lon, success.data.coord.lat,success.data.main.temp,success2.data.formatted,
			 success2.data.zoneName, success2.data.abbreviation,success2.data.countryName,dday, kondisi);
			/*
			$scope.time = {
				timezone:success2.data.formatted,
				zonename:success2.data.zoneName,
				abbreviation:success2.data.abbreviation,
				country:success2.data.countryName,
				day:""
			};


			$scope.weather = {
				cuaca:success.data.weather[0].main,
				description:success.data.weather[0].description,
				icon:`http://openweathermap.org/img/w/${success.data.weather[0].icon}.png`,
				temperature:success.data.main.temp,
				pressure:success.data.main.pressure,
				humidity:success.data.main.humidity,
				city:success.data.name,
				lon:success.data.coord.lon,
				lat:success.data.coord.lat

			};
			


			

			*/
		
			
			
		
			
			//$scope.initMap();

		},function(error2) {

		});

	}, function(error) {

	});
	}

	
}

app.controller("Controller1", ["$scope", "$http", "$routeParams", "myFactory" ,"$interval", "$timeout" ,controllers.controller1]);

controllers.Controller2 = function($scope, $http, $routeParams, myFactory) {
	let data2;
	data2 = myFactory.getData();
			$scope.time = {
				timezone:data2.timezone,
				zonename:data2.zonename,
				abbreviation:data2.abbreviation,
				country:data2.country,
				day:data2.day
			};


			$scope.weather = {
				cuaca:data2.cuaca,
				description:data2.description,
				icon:data2.icon,
				temperature:data2.temperature,
				pressure:data2.pressure,
				humidity:data2.humidity,
				city:data2.city,
				lon:data2.lon,
				lat:data2.lat,
				cond:data2.kondisi

			};

}

app.controller("Controller2", ["$scope", "$http", "$routeParams", "myFactory", controllers.Controller2]);

app.config(function($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl:"page/home.html",
		controller:"Controller1",
		css:"css/index.css"
	}).when("/cuaca", {
		templateUrl:"page/cuaca.html",
		controller:"Controller2",
		css:"css/index.css"
	}).when("/map", {
		templateUrl:"page/map.html",
		controller:"Controller1",
		css:"css/index.css"
	}).otherwise({
		redirectTo:"/home"
	})
});


