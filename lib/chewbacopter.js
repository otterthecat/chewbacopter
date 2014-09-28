var chalk = require('chalk');

var arDrone;

exports.use = function (drone) {

	arDrone = drone;
	// Config - allow for useful event emitting
	arDrone.config('general:navdata_demo', 'FALSE');
};


exports.follow = function () {

	var navdata;
	drone.on('navdata', function(data){
		navdata = data;
	});

	setInterval(function () {
		process.stdout.write(chalk.blue(data) + '\r');
	}, 1000);
};
