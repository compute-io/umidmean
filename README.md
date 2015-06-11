Upper Midmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [upper interquartile mean](http://www.jstor.org/stable/1268431) (upper midmean).

## Installation

``` bash
$ npm install compute-umidmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var umidmean = require( 'compute-umidmean' );
```

#### umidmean( x[, opts] )

Computes the [upper midmean](http://www.jstor.org/stable/1268431). This is computed by discarding all values below the median and calculating the mean of those values falling between the first and third quartiles. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var unsorted, mean;

unsorted = [ 5, 6, 7, 2, 1, 8, 4, 3 ];
mean = umidmean( unsorted );
// returns 6.5

unsorted = new Int8Array( unsorted );
mean = umidmean( unsorted );
// returns 6.5
```

Note: the input array must contain 6 or more elements, otherwise the function returns `null`.

If the input `array` is already `sorted` in __ascending__ order, set the optional second argument to `true`.

``` javascript
var sorted = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

var mean = umidmean( sorted, {
    'sorted': true
});
// returns 6.5
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':5},
	{'x':6},
	{'x':7},
	{'x':2},
	{'x':1},
	{'x':8},
    {'x':4},
    {'x':3}
];

function getValue( d, i ) {
	return d.x;
}

var mu = umidmean( data, {
	'accessor': getValue
});
// returns 6.5
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [upper midmean](http://www.jstor.org/stable/1268431). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [upper midmean](http://www.jstor.org/stable/1268431) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 36 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [6,6], 'int8' );
/*
    [ 0  1  2  3  4  5
      6  7  8  9 10 11
      12 13 14 15 16 17
      18 19 20 21 22 23
      24 25 26 27 28 29
      30 31 32 33 34 35 ]
*/

mu = umidmean( mat );
/*
	[  1
	   7
	  13
	  19
	  25
      31 ]
*/
```

To compute the [upper midmean](http://www.jstor.org/stable/1268431) along the rows, set the `dim` option to `1`.

``` javascript
mu = umidmean( mat, {
	'dim': 1
});
/*
	[ 6, 7, 8, 9, 10, 11 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = umidmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 6, 7, 8, 9, 10, 11]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
mu = umidmean( mat );
// returns 2

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
mu = umidmean( mat );
// returns 2
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = umidmean( [] );
// returns null

mu = umidmean( new Int8Array( [] ) );
// returns null

mu = umidmean( matrix( [0,0] ) );
// returns null

mu = umidmean( matrix( [0,10] ) );
// returns null

mu = umidmean( matrix( [10,0] ) );
// returns null
```

## Notes

If provided an unsorted input `array`, the function is `O( N log(N) + m )`, where `N` is the input `array` length and `m` is the number of values located between the first and third quartiles of the upper range. If the input `array` is already sorted in __ascending__ order, the function is `O(m)`.

The upper midmean includes the values located between *but not including* the first and third quartiles of the upper range. In the following examples, the values included in the upper midmean are in bold.

*	[1,2,3,4,5,__6,7__,8] —> umidmean: 6.5

*	[1,2,3,4,5,6,7,8,__9,10__,11,12] —> umidmean: 9.5


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	umidmean = require( 'compute-umidmean' );

var data,
	mat,
	mu,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = umidmean( data );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = umidmean( data, {
	'accessor': getValue
});


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = umidmean( data );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = umidmean( mat, {
	'dim': 1
});


// ----
// Matrices (along columns)...
mu = umidmean( mat, {
	'dim': 2
});


// ----
// Matrices (custom output data type)...
mu = umidmean( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-umidmean.svg
[npm-url]: https://npmjs.org/package/compute-umidmean

[travis-image]: http://img.shields.io/travis/compute-io/umidmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/umidmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/umidmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/umidmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/umidmean.svg
[dependencies-url]: https://david-dm.org/compute-io/umidmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/umidmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/umidmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/umidmean.svg
[github-issues-url]: https://github.com/compute-io/umidmean/issues
