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

var parseObject = function (obj) {
	'use strict';

	var output = '';
	for(var item in obj) {
		if(typeof obj[item] === 'object') {
			output += chalk.blue.inverse(item + ' > ');
			output += parseObject(obj[item]);
		}
		else {
			output += '\n' + (chalk.blue.inverse(item) + chalk.green(' ' + obj[item]));
		}
	}

	return output + '\n';
};

var generateTextDisplay = function (data, target) {
	'use strict';

	var details = '\n';
	for(var item in data) {
		if(target.hasOwnProperty(item)) {
			var o = {};
			o[item] = data[item];
			details += parseObject(o);
		}
	}

	return details;
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

		var output = generateTextDisplay(data.demo, this.navData);
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
