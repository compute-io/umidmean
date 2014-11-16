'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	umidmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-umidmean', function tests() {

	it( 'should export a function', function test() {
		expect( umidmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				umidmean( value, true );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean for the second argument', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				umidmean( [], value );
			};
		}
	});

	it( 'should throw an error if provided an array of insufficient length', function test() {
		var data = [ 2, 5, 7, 7, 1 ];

		function badValue( array ) {
			return function() {
				umidmean( array );
			};
		}		

		expect( badValue( data ) ).to.throw( TypeError );

	});

	it( 'should compute the umidmean when len divides by 8', function test() {
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

	it( 'should compute the umidmean when len does not divide by 8', function test() {
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

});
