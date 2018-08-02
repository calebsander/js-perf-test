const MAX_LENGTH = 100
const SOME_STRINGS = new Array(MAX_LENGTH).fill().map((_, i) => 'a'.repeat(i))

module.exports = {
	concat() {
		let totalLength = 0
		for (let i = 0; i < MAX_LENGTH; i++) {
			const str = 'leading-string ' + SOME_STRINGS[i] + ' trailing-string'
			totalLength += str.length
		}
		return totalLength
	},
	template() {
		let totalLength = 0
		for (let i = 0; i < MAX_LENGTH; i++) {
			const str = `leading-string ${SOME_STRINGS[i]} trailing-string`
			totalLength += str.length
		}
		return totalLength
	}
}