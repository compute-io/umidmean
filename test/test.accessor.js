/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	umidmean = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor umidmean', function tests() {

	it( 'should export a function', function test() {
		expect( umidmean ).to.be.a( 'function' );
	});

	it( 'should compute the upper interquartile mean (midmean) for an array length divisible by 8', function test() {
		var data, expected;

		data = [
			{'x':15},
			{'x':9},
			{'x':4},
			{'x':12},
			{'x':14},
			{'x':8},
			{'x':2},
			{'x':5},
			{'x':16},
			{'x':1},
			{'x':10},
			{'x':3},
			{'x':6},
			{'x':7},
			{'x':11},
			{'x':13}
		];
		expected = 12.5;

		// Unsorted test:
		assert.strictEqual( umidmean( data, getValue ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a.x - b.x;
		});

		// Sorted test:
		assert.strictEqual( umidmean( data, getValue, true ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the upper interquartile mean (midmean) for an array length not divisible by 8', function test() {
		var data, expected;

		data = [
			{'x':9},
			{'x':4},
			{'x':12},
			{'x':8},
			{'x':2},
			{'x':5},
			{'x':1},
			{'x':10},
			{'x':3},
			{'x':6},
			{'x':7},
			{'x':11}
		];
		expected = 9.5;

		// Unsorted test:
		assert.strictEqual( umidmean( data, getValue ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a.x - b.x;
		});

		// Sorted test:
		assert.strictEqual( umidmean( data, getValue, true ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( umidmean( [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an array of insufficient length', function test() {
		var data = [
			{'x': 2},
			{'x': 5},
			{'x': 7},
			{'x': 7},
			{'x': 1}
		];

		assert.isNull( umidmean( data, getValue ) );

		function getValue( d ) {
			return d.x;
		}

	});

});
