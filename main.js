var http = require('http');

function main(){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
	var zip = "97403";
	url+=zip;
	//this is just some id which allows us to query the API
	url+=",us&appid=44db6a862fba0b067b1930da0d769e98";

	http.get(url, function(res) {
		//The response ('res') contains more information than you could ever want
		//console.log(`STATUS: ${res.statusCode}`);
		//console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.on('data', function(data){
			//data is simply full of goodies... dump it to have a look!
			data = JSON.parse(data);
			var city = data.name;
			var temp = (data.main.temp - 273.15)* 1.8000 + 32.00;
			console.log("The temperature in "+city+" is "+temp.toFixed(2)+" degrees fahrenheit");
		});
	});
}


main();