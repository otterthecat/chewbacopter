var chalk = require('chalk');
var log = require('single-line-log').stdout;

var arDrone, navData;

exports.use = function (drone) {
	'use strict';
	arDrone = drone;

	// Config - allow for useful event emitting
	arDrone.config('general:navdata_demo', 'FALSE');
	return this;
};

exports.follow = function () {
	'use strict';
	arDrone.on('navdata', function(data){
		navData = data;
		log(chalk.blue('data: %o', navData));
	});
};
