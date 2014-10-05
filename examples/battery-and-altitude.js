// This assumes you've defined the below packages
// as dependencies in your package.json,
// and you ran 'npm install'
var arDrone = require('ar-drone');
var Chewbacopter = require('chewbacopter');

var client = arDrone.createClient();

var chewie = new Chewbacopter();
chewie.use(client, [
		'batteryPercentage',
		'altitudeMeters'
		]).monitor();

client.takeoff();

client
	.after(10000, function() {
		this.stop();
		this.land();
	});
