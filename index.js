const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const TEST_TIME_MULTIPLIER = 10 //test is run once, then TEST_TIME_MULTIPLIER times, then TEST_TIME_MULTIPLIER ** 2 times, etc. to estimate its speed
const TIME_THRESHOLD = 100 //ms
const TARGET_RUNTIME = 5000 //ms

function time(test, times) {
	const start = Date.now()
	for (let i = 0; i < times; i++) test()
	return (Date.now() - start) / times
}
function baselineTime(times) {
	const start = Date.now()
	for (let i = 0; i < times; i++);
	return (Date.now() - start) / times
}

const {argv} = process
const suitesToTest = new Set(argv.slice(2).map(suite => path.resolve(suite)))
const shouldTest = suite => !suitesToTest.size || suitesToTest.has(suite)

promisify(fs.readdir)('.')
	.then(entries =>
		entries
			.filter(entry => entry.indexOf('.') === -1) //filter for directories
			.filter(entry => shouldTest(path.resolve(entry)))
	)
	.then(entries => {
		for (const entry of entries) {
			console.log('Running suite:', entry)
			const tests = require('./' + entry)
			let bestTest = null, bestOps = -Infinity
			for (const testName in tests) {
				console.log('\t' + testName + ':')
				const test = tests[testName]
				let times = 1, timeEstimate
				while (times * (timeEstimate = time(test, times)) < TIME_THRESHOLD) { //make sure there is statistically significant runtime data
					times *= TEST_TIME_MULTIPLIER
				}
				console.log('\t\tEstimate:', timeEstimate, 'ms over', times, 'iterations')
				const accurateTests = Math.ceil(TARGET_RUNTIME / timeEstimate)
				const accurateTime = time(test, accurateTests)
				const baseline = baselineTime(accurateTests)
				const opsPerSecond = 1e3 / (baseline < accurateTime ? accurateTime - baseline : accurateTime)
				console.log('\t\tOperations per second:', opsPerSecond.toExponential(3), 'over', accurateTests, 'iterations')
				if (opsPerSecond > bestOps) {
					bestTest = testName
					bestOps = opsPerSecond
				}
			}
			console.log('\tBEST:', bestTest, 'at', bestOps.toExponential(3), 'ops/s')
		}
	})