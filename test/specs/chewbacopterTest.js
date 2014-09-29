/* jshint expr: true */
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
			var isNull = chewie.navData === null;
			isNull.should.equal(true);
		});
	});

	describe('#use ', function () {
		var client = {
			config : sinon.spy()
		};
		var chewie = new Chewie();
		var returnValue = chewie.use(client);
		it('should set drone property via argument', function () {
			chewie.drone.should.equal(client);
		});

		it('should set drone config to get navdata.demo object', function () {
			client.config.withArgs('general:navdata_demo', 'TRUE').should.have.been.calledOnce;
		});

		it('should return chewbacopter object for chaining', function () {
			returnValue.should.equal(chewie);
		});
	});

	describe('#format ', function () {
		var chewie = new Chewie();
		var fakeData = {
			demo : {
				distance : 20
			}
		};
		var returnValue = chewie.format(fakeData);

		it('should return parsed string', function () {
			returnValue.should.be.a.string;
		});
	});

	describe('#copilot ', function () {
		var client = {
			config : function () {},
			on : sinon.spy()
		};
		var chewie = new Chewie();
		var returnValue = chewie.use(client).copilot();

		it('should listen for navdata changes from drone client', function () {
			client.on.withArgs('navdata', chewie.format).should.have.been.calledOnce;
		});

		it('should return chewbacopter instance for chaining', function () {
			returnValue.should.equal(chewie);
		});
	});
});
