/**
*
*	COMPUTE: umidmean
*
*
*	DESCRIPTION:
*		- Computes the interquartile mean of the values above the median for a numeric array (upper midmean).
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// UPPER MIDMEAN //

/**
* FUNCTION: umidmean( arr[, sorted] )
*	Computes the interquartile mean of the values above the median in a numeric array (upper midmean).
*
* @param {Array} arr - numeric array
* @param {Boolean} [sorted] - boolean flag indicating if the input array is sorted in ascending order
* @returns {Number} umidmean
*/
function umidmean( arr, sorted ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'umidmean()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 1 && typeof sorted !== 'boolean' ) {
		throw new TypeError( 'umidmean()::invalid input argument. Second argument must be a boolean.' );
	}
	if ( !sorted ) {
		arr = arr.slice();
		arr.sort( ascending );
	}
	var len = arr.length,
		mean = 0,
		N = 0,
		delta,
		uq1,
		uq3;

	// Get the array indices for the upper first and third quartiles
	uq1 = Math.floor( len*0.625 );
	uq3 = Math.floor( len*0.875 );

	// Compute an arithmetic mean...
	for ( var i = uq1, j = uq3+1; i < j; i++ ) {
		N += 1;
		delta = arr[ i ] - mean;
		mean += delta / N;
	}
	return mean;
} // end FUNCTION umidmean()


// EXPORTS //

module.exports = umidmean;
