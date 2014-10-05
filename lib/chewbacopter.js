// properties passed from drone client's [navData] event
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

var assignArrayToObject = function (ary, obj) {
	'use strict';

	ary.forEach(function (element) {
		obj[element] = true;
	});
	return obj;
};

var parseDataToLog = function (data, target) {
	'use strict';

	var output = '';
	for(var item in data) {
		if(target.hasOwnProperty(item)) {
			output += chalk.blue(item + ' : ') + chalk.green(data[item]) + '\n';
		}
	}
	return output;
};

var Chewbacopter = function () {
	'use strict';

	this.drone = null;
	this.navData = {};
};

Chewbacopter.prototype = {
	use : function (drone, ary) {
		'use strict';

		this.drone = drone;
		this.drone.config('general:navdata_demo', 'TRUE');

		var dataArray = (arguments.length < 2) ? DEMO_DATA : ary;
		assignArrayToObject(dataArray, this.navData);

		return this;
	},

	format : function (data) {
		'use strict';

		var output = parseDataToLog(data.demo, this.navData);
		log(output);
		return output;
	},

	monitor : function () {
		'use strict';

		this.drone.on('navdata', this.format.bind(this));
		return this;
	}
};

module.exports = Chewbacopter;
