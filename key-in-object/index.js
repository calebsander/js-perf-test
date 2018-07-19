const MAX_KEY_LENGTH = 1e3
const obj = {}
for (let i = 0; i < MAX_KEY_LENGTH; i++) obj['a'.repeat(i)] = i

module.exports = {
	isIn() {
		let keyCount = 0
		keyCount += 'aaaaaaaaaaaaaaaaaaaa' in obj
		keyCount += 'bbbbbbbbbbbbbbbbbbbb' in obj
		return keyCount
	},
	hasOwnProperty() {
		let keyCount = 0
		keyCount += obj.hasOwnProperty('aaaaaaaaaaaaaaaaaaaa')
		keyCount += obj.hasOwnProperty('bbbbbbbbbbbbbbbbbbbb')
		return keyCount
	},
	isDefined() {
		let keyCount = 0
		keyCount += obj.aaaaaaaaaaaaaaaaaaaa !== undefined
		keyCount += obj.bbbbbbbbbbbbbbbbbbbb !== undefined
		return keyCount
	}
}