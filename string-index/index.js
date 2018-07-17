const LENGTH = 1e3
const arr = new Array(LENGTH).fill().map((_, i) => String.fromCodePoint(i))
const str = arr.join('')

module.exports = {
	arrayIndex() {
		let sum = 0
		for (let i = 0; i < LENGTH; i++) sum += arr[i].codePointAt(0)
		return sum
	},
	stringIndex() {
		let sum = 0
		for (let i = 0; i < LENGTH; i++) sum += str[i].codePointAt(0)
		return sum
	},
	stringCharAt() {
		let sum = 0
		for (let i = 0; i < LENGTH; i++) sum += str.charAt(i).codePointAt(0)
		return sum
	}
}