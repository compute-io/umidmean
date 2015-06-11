/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	umidmean = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix umidmean', function tests() {

	var data,
		mat,
		mat2,
		i;

	data = new Int32Array( 81 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	mat = matrix( data, [9,9], 'int8' );
	mat2 = mat.mget( null, [ 0, 1, 2, 3, 4, 5, 6, 7 ] );

	it( 'should export a function', function test() {
		expect( umidmean ).to.be.a( 'function' );
	});

	it( 'should compute the umidmean along matrix columns', function test() {
		var out, midm, expected;

		out = matrix( [9,1], 'float64' );

		midm = umidmean( out, mat );
		expected = '6;15;24;33;42;51;60;69;78';

		assert.strictEqual( midm.toString(), expected );

		midm = umidmean( out, mat, false, 2 );
		expected = '6;15;24;33;42;51;60;69;78';

		assert.strictEqual( midm.toString(), expected );
	});

	it( 'should compute the umidmean along matrix columns with row length divisible by 8', function test() {
		var out, midm, expected;

		out = matrix( [8,1], 'float64' );

		midm = umidmean( out, mat2 );
		expected = '5.5;14.5;23.5;32.5;41.5;50.5;59.5;68.5';

		assert.strictEqual( midm.toString(), expected );

		midm = umidmean( out, mat2, false, 2 );
		expected = '5.5;14.5;23.5;32.5;41.5;50.5;59.5;68.5';

		assert.strictEqual( midm.toString(), expected );
	});

    it( 'should compute the umidmean along matrix columns for already sorted rows', function test() {
        var out, midm, expected;

        out = matrix( [9,1], 'float64' );

		midm = umidmean( out, mat, true );
        expected = '6;15;24;33;42;51;60;69;78';

        assert.strictEqual( midm.toString(), expected );

		midm = umidmean( out, mat, true, 2 );
        expected = '6;15;24;33;42;51;60;69;78';

        assert.strictEqual( midm.toString(), expected );
    });

	it( 'should compute the umidmean along matrix rows', function test() {
		var out, midm, expected;

		out = matrix( [1,9], 'float64' );

		midm = umidmean( out, mat, false, 1 );
		expected = '54,55,56,57,58,59,60,61,62';

		assert.strictEqual( midm.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( umidmean( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( umidmean( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( umidmean( out, mat ) );
	});

	it( 'should return null if provided a matrix with less than three elements on dimension for which to calculate the umidmean' , function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [ 2, 10 ] );
		assert.isNull( umidmean( out, mat, false, 1 ) );

		mat = matrix( [ 10, 2 ] );
		assert.isNull( umidmean( out, mat, false, 2 ) );

	});

});
