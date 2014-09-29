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
			config : function () {}
		};
		var chewie = new Chewie();
		chewie.use(client);
		it('should set drone property via argument', function () {
			chewie.drone.should.equal(client);
		});
	});
});
