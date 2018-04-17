const testObject = {}
for (let key = ''; key.length < 100; key += 'a') testObject[key] = true

module.exports = {
	keysArray() {
		return Object.keys(testObject).length
	},
	keyCount() {
		let i
		for (const _ in testObject) i++
		return i
	}
}