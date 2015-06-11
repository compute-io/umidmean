/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	umidmean = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array umidmean', function tests() {

	it( 'should export a function', function test() {
		expect( umidmean ).to.be.a( 'function' );
	});


	it( 'should compute the umidmean when the array length divides by 8', function test() {
		var data, expected;

		data = [ 15, 9, 4, 12, 14, 8, 2, 5, 16, 1, 10, 3, 6, 7, 11, 13 ];
		expected = 12.5;

		// Unsorted test:
		assert.strictEqual( umidmean( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.strictEqual( umidmean( data, true ), expected );
	});

	it( 'should compute the umidmean when the array length does not divide by 8', function test() {
		var data, expected;

		data = [ 9, 4, 12, 8, 2, 5, 1, 10, 3, 6, 7, 11 ];
		expected = 9.5;

		// Unsorted test:
		assert.strictEqual( umidmean( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.strictEqual( umidmean( data, true ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( umidmean( [] ) );
	});

	it( 'should return null if provided an array of insufficient length', function test() {
		var data = [ 2, 5, 7, 7, 1 ];

		assert.isNull( umidmean( data ) );

	});

});
