const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

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
const suitesToTest = new Set
for (let i = 2; i < argv.length; i++) suitesToTest.add(path.resolve(argv[i]))
const shouldTest = suite => !suitesToTest.size || suitesToTest.has(suite)

promisify(fs.readdir)('.')
	.then(entries =>
		entries
			.filter(entry => entry.indexOf('.') === -1)
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
				let times = 1, timeEstimate = 0
				while (times * (timeEstimate = time(test, times)) < TIME_THRESHOLD) { //make sure there is statistically significant runtime data
					times *= 10
				}
				console.log('\t\tEstimate:', timeEstimate, 'ms over', times, 'iterations')
				const accurateTests = Math.ceil(TARGET_RUNTIME / timeEstimate)
				const accurateTime = time(test, accurateTests)
				let baseline = baselineTime(accurateTests)
				if (baseline > accurateTime) baseline = 0
				const opsPerSecond = 1e3 / (accurateTime - baseline)
				console.log('\t\tOperations per second:', opsPerSecond.toExponential(3), 'over', accurateTests, 'iterations')
				if (opsPerSecond > bestOps) {
					bestTest = testName
					bestOps = opsPerSecond
				}
			}
			console.log('\tBEST:', bestTest, 'at', bestOps.toExponential(3), 'ops/s')
		}
	})