Upper Midmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [upper interquartile mean](http://www.jstor.org/stable/1268431) (upper midmean) of a numeric array. 

## Installation

``` bash
$ npm install compute-umidmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var umidmean = require( 'compute-umidmean' );
```

#### umidmean( arr[, sorted] )

Computes the [upper midmean](http://www.jstor.org/stable/1268431) of a numeric `array`. This is computed by discarding all values below the median and calculating the mean of those values falling between the first and third quartiles.

Note: the input array must contain 6 or more elements.


``` javascript
var unsorted = [ 5, 6, 7, 2, 1, 8, 4, 3 ];

var mean = umidmean( unsorted );
// returns 6.5
```

If the input `array` is already `sorted` in __ascending__ order, set the optional second argument to `true`.

``` javascript
var sorted = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

var mean = umidmean( sorted, true );
// returns 6.5
```



## Examples

``` javascript
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
    data[ i ] = Math.round( Math.random()*100 );
}

console.log( umidmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Notes

If provided an unsorted input `array`, the function is `O( N log(N) + m )`, where `N` is the input `array` length and `m` is the number of values located between the first and third quartiles of the upper range. If the input `array` is already sorted in __ascending__ order, the function is `O(m)`.

The upper midmean includes the values located between *but not including* the first and third quartiles of the upper range. In the following examples, the values included in the upper midmean are in bold.

*	[1,2,3,4,5,__6,7__,8] —> umidmean: 6.5

*	[1,2,3,4,5,6,7,8,__9,10__,11,12] —> umidmean: 9.5



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.


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
