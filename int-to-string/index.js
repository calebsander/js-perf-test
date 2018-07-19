const int = 0x12345678

module.exports = {
	castToString() {
		return ('' + int).length
	},
	stringConstructor() {
		return String(int).length
	},
	toString() {
		return int.toString().length
	},
	toStringRadix() {
		return int.toString(10).length
	}
}