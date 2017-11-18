const randomString = require('../random-string')

const str = randomString(1000)

module.exports = {
	split() {
		const result = str.split('')
	},
	spread() {
		const result = [...str]
	},
	arrayFrom() {
		const result = Array.from(str)
	}
}