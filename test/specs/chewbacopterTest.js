/* jshint expr: true */
/* jshint maxstatements: 10 */
// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// stubs
// /////////////////////////////////////////////////////////


// modules to test
// /////////////////////////////////////////////////////////
var Chewie = require('../../lib/chewbacopter');

describe('Chewbacopter ', function () {
	'use strict';

	it('should be a constructor function', function () {
		Chewie.should.be.a('function');
	});

	describe('instance ', function () {
		var chewie = new Chewie();
		it('should have .drone property default to null', function () {
			var isNull = chewie.drone === null;
			isNull.should.equal(true);
		});

		it('should have navData property default to null', function () {
			chewie.navData.should.be.an('object');
		});
	});

	describe('#use ', function () {
		var client = {
			config : sinon.spy()
		};
		var dataArray = ['batteryPercentage', 'altitudeMeters'];
		var chewie = new Chewie();
		var returnValue = chewie.use(client, dataArray);
		it('should set drone property via argument', function () {
			chewie.drone.should.equal(client);
		});

		it('should set navData property via 2nd argument', function () {
			chewie.navData.should.have.keys(['batteryPercentage', 'altitudeMeters']);
		});

		it('should set drone config to get navdata.demo object', function () {
			client.config.withArgs('general:navdata_demo', 'TRUE').should.have.been.calledOnce;
		});

		it('should return chewbacopter object for chaining', function () {
			returnValue.should.equal(chewie);
		});

		describe('when not passed property array', function () {
			var chewie = new Chewie();
			var drone = {
				config : function () {}
			};
			chewie.use(drone);

			it('should apply all available properties to navData', function () {
				chewie.navData.should.have.keys([
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
				]);
			});
		});
	});

	describe('#format ', function () {
		var chewie = new Chewie();
		var fakeData = {
			demo : {
				distance : 20,
				batteryPercentage : 15,
				drone : {
					fakeOption : 3
				}
			}
		};
		var returnValue = chewie.use(
				{config : function () {}},
				['batteryPercentage', 'drone']
			).format(fakeData);

		it('should return parsed string', function () {
			returnValue.should.be.a.string;
		});

		it('should include only properties applied to navData', function () {
			returnValue.should.contain('batteryPercentage');
			returnValue.should.contain('drone');
			returnValue.should.contain('fakeOption');
			returnValue.should.not.contain('distance');
		});
	});

	describe('#monitor ', function () {
		var client = {
			config : function () {},
			on : sinon.spy()
		};
		var chewie = new Chewie();
		var returnValue = chewie.use(client, []).monitor();

		it('should listen for navdata changes from drone client', function () {
			var passedArgs = client.on.args[0];
			// first argument should be the event,
			// second should be the callback
			passedArgs[0].should.equal('navdata');
			passedArgs[1].should.be.a('function');
		});

		it('should return chewbacopter instance for chaining', function () {
			returnValue.should.equal(chewie);
		});
	});
});
