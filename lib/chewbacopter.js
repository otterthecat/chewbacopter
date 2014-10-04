var DEMO_DATA = [
	'controlState',
	'flyState',
	'batteryPercentage',
	'rotation', // object
	'frontBackDegrees',
	'leftRightDegrees',
	'clockwiseDegrees',
	'altitude',
	'altitudeMeters',
	'velocity', // object
	'xVelocity',
	'yVelocity',
	'zVelocity',
	'frameIndex',
	'detection', // object
	'drone' // object
];

var chalk = require('chalk');
var log = require('single-line-log').stdout;

var Chewbacopter = function () {
	'use strict';

	this.drone = null;
	this.navData = null;
};

Chewbacopter.prototype = {
	use : function (drone) {
		'use strict';

		this.drone = drone;
		this.drone.config('general:navdata_demo', 'TRUE');
		return this;
	},

	format : function (data) {
		'use strict';

		var output = '';
		for(var item in data.demo) {
			if(data.demo.hasOwnProperty(item)) {
				output += chalk.blue(item + ' : ') + chalk.green(data.demo[item]) + '\n';
			}
		}
		log(output);
		return output;
	},

	monitor : function () {
		'use strict';

		this.drone.on('navdata', this.format);
		return this;
	}
};

module.exports = Chewbacopter;
