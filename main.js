var http = require('http');

function main(){
	var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
	var zip;

	//This nifty bit of code allows us to read command line arguments
	/*
	process.argv.forEach(function (val, index, array) {
		console.log(index + ': ' + val);
	});
	*/

	if(process.argv.length < 3)
	{
		console.log("Hint: You can provide a zip code as a command line argument");
		console.log("\t(i.e. 'node main.js 97403')");
		console.log("\t--Using default zip code--");
		zip = "97403";
	}
	else
	{
		zip = process.argv[2];
	}
	
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
			//The temp provided by the api is in kelvin... we'll need to convert it
			var temp = (data.main.temp - 273.15)* 1.8000 + 32.00;
			//Here comes a template literal!
			console.log(`\nThe temperature in ${city} is ${temp.toFixed(2)} degrees fahrenheit\n`);
		});
	});
}

main();