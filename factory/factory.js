app.factory("myFactory", function () {
	
	var myfactory = {
		cuaca:"",
		city:"",
		pressure:0,
		humidity:0,
		description:"",
		icon:"",
		lon:0,
		lat:0,
		temperature:0,
		timezone:"",
		zonename:"",
		abbreviation:"",
		country:"",
		day:"",
		kondisi:""
	};



	return {
		
		getData : function() {
			return myfactory;
		},

		changeAll : function(Cuaca, City, Pressure, Humidity, Description,Icon, Lon, Lat, Temperature, Timezone,Zonename, Abbreviation, Country, Day, Kondisi) {
			myfactory.cuaca = Cuaca;
			myfactory.city = City;
			myfactory.pressure = Pressure;
			myfactory.humidity = Humidity;
			myfactory.description = Description;
			myfactory.icon = Icon;
			myfactory.lon = Lon;
			myfactory.lat = Lat;
			myfactory.temperature = Temperature;
			myfactory.timezone = Timezone;
			myfactory.zonename = Zonename;
			myfactory.abbreviation = Abbreviation;
			myfactory.country = Country;
			myfactory.day = Day;
			myfactory.kondisi = Kondisi;
			
		}

	};

});

