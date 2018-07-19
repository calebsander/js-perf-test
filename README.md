# js-perf-test

A simple script to test the speed of equivalent pieces of JavaScript code.
Several test suites (e.g. `array-append`, `object-iteration`, `string-includes`) are currently included.

## Results

All suites are run on current versions of Node.js on Travis-CI whenever the code is updated.
Results for all suites can be seen on [Travis](https://travis-ci.org/calebsander/js-perf-test).
A separate build job is run on each major version of Node.js 8.0.0 or later.
The relative results should be similar across versions of Node.js or Google Chrome, since they all use the V8 JavaScript engine.
Of course, different JavaScript engines, operating systems, or processors may give different results.
You can run the tests locally with `npm t`.

Sample output for one suite:
````
Running suite: array-append
	index:
		Estimate: 0.0616 ms over 10000 iterations
		Operations per second: 1.658e+4 over 81169 iterations
	push:
		Estimate: 0.0772 ms over 10000 iterations
		Operations per second: 1.344e+4 over 64767 iterations
	map:
		Estimate: 0.209 ms over 1000 iterations
		Operations per second: 1.484e+4 over 23924 iterations
	generator:
		Estimate: 1.55 ms over 100 iterations
		Operations per second: 5.702e+1 over 243 iterations
	concat:
		Estimate: 260 ms over 1 iterations
		Operations per second: 3.531e+0 over 20 iterations
	spread:
		Estimate: 556 ms over 1 iterations
		Operations per second: 2.015e+0 over 9 iterations
	BEST: index at 1.658e+4 ops/s
````
This indicates that there are 6 tests in the [`array-append` suite](https://github.com/calebsander/js-perf-test/blob/master/array-append/index.js), each of which builds an array with the numbers 0 to 9999 in a different manner.
`index` and `push` are by far the fastest, each running about 1700 times per second.
The absolute execution times are not usually very useful, since they depend on the length of the array being constructed, but the relative execution times should remain the same if the operations have the same asymptotic complexity.

## How it works

Each suite exports several functions to be tested.
Each function is run 1 time, then 10 times, then 100 times, and so on until the total execution time exceeds 100 ms.
Since the execution times of the functions vary from nanoseconds to hundreds of milliseconds, this quickly determines how many times the function must be run to minimize the overhead caused by the test script.
Dividing the total execution time by the number of times the function was run gives a rough estimate of the amount of time it takes to execute the function once.
The script then estimates how many times the function would have to be run for a total execution time of 5 seconds.
The function is run this many times and its total execution time is divided by the number of times to get a final estimate of one iteration's time.

## Adding test suites

I try to add new test suites whenever I want to know what the fastest way to do something is in JavaScript, but this collection is far from comprehensive.
If you have a new test idea, please submit an issue or, even better, a pull request.
I would be happy to merge any simple, useful test suite.

It is easy to add test suites: just make a new folder with the desired name of the suite and create an `index.js` file in the folder.
You can copy from one of the other suites, or use the following template for a new suite's `index.js` file:
````javascript
// Initialization code, e.g. constants or utility functions
// ...

module.exports = {
	test1() {
		// Code for executing a single iteration of test 1
		// ...
	},
	test2() {
		// Code for executing a single iteration of test 2
		// ...
	},
	// Other tests
	// ...
}
````

Running `node index.js` will run all suites, but you can also specify the suites to run, e.g. `node index.js int-to-string string-to-int` will only run `int-to-string` and `string-to-int`.
If your tests are running very fast (< 1 microsecond per execution), consider increasing the scale of the test (e.g. operating on longer arrays) to minimize the impact of testing overhead on performance.

#
Caleb Sander, 2017