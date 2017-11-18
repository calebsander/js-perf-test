const randomString = require('../random-string')

const substring = 'findme'
const substringRegex = new RegExp(substring)
const withSubstring = randomString(500) + substring + randomString(500)
const withoutSubstring = randomString(withSubstring.length)

module.exports = {
	indexOf() {
		const resultWith = withSubstring.indexOf(substring) !== -1
		const resultWithout = withoutSubstring.indexOf(substring) !== -1
	},
	regexTest() {
		const resultWith = substringRegex.test(withSubstring)
		const resultWithout = substringRegex.test(withoutSubstring)
	},
	regexMatch() {
		const resultWith = withSubstring.match(substringRegex) !== null
		const resultWithout = withoutSubstring.match(substringRegex) !== null
	},
	includes() {
		const resultWith = withSubstring.includes(substring)
		const resultWithout = withoutSubstring.includes(substring)
	},
	search() {
		const resultWith = withSubstring.search(substringRegex) !== -1
		const resultWithout = withoutSubstring.search(substringRegex) !== -1
	}
}