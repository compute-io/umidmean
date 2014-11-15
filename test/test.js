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

	it( 'should compute the upper interquartile mean (umidmean)', function test() {
		var data, expected;

		data = [ 5, 8, 4, 38, 8, 6, 9, 7, 7, 3, 1, 6, 7 ];
		expected = ;

		// Unsorted test:
		assert.closeTo( umidmean( data ), expected, 1e-10 );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.closeTo( umidmean( data, true ), expected, 1e-10 );
	});

});
