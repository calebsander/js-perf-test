const str = '1234567890'

module.exports = {
	castToNumber() {
		return +str
	},
	numberConstructor() {
		return Number(str)
	},
	parseInt() {
		return parseInt(str)
	},
	parseIntRadix() {
		return parseInt(str, 10)
	}
}