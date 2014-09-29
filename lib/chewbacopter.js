// DATA SAMPLE FROM navdata.demo:
//
// controlState : CTRL_LANDED
// flyState : FLYING_OK
// batteryPercentage : 46
// rotation :    { frontBack: 0.068,
     // pitch: 0.068,
     // theta: 0.068,
     // y: 0.068,
     // leftRight: 0.272,
     // roll: 0.272,
     // phi: 0.272,
     // x: 0.272,
     // clockwise: -135.992,
     // yaw: -135.992,
     // psi: -135.992,
     // z: -135.992
// },
// frontBackDegrees : -1.842
// leftRightDegrees : 1.947
// clockwiseDegrees : -132.384
// altitude : 0
// altitudeMeters : 0
// velocity : { x: 0, y: 0, z: 0 },
// xVelocity : 0
// yVelocity : 0
// zVelocity : 0
// frameIndex : 0
// detection :
//  { camera: { rotation: [Object], translation: [Object], type: 3 },tagIndex: 0 },
// drone : { camera: { rotation: [Object], translation: [Object] } }

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

	copilot : function () {
		'use strict';

		this.drone.on('navdata', function (data) {
			var output = '';
			for(var item in data.demo) {
				output += chalk.blue(item + ' : ') + chalk.green(data.demo[item]) + '\n';
			}
			log(output);
		});

		return this;
	}
};

module.exports = Chewbacopter;
