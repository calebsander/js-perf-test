const MAX = 1e5
const INC = 3

module.exports = {
	number() {
		let count = 0
		for (let i = 0; i < MAX; i += INC) {
			if (i & 3) { // trying to cause lots of branch mispredictions
				count++
			}
		}
		return count
	},
	greater() {
		let count = 0
		for (let i = 0; i < MAX; i += INC) {
			if (i & 3 > 0) { // trying to cause lots of branch mispredictions
				count++
			}
		}
		return count
	},
	notEqual() {
		let count = 0
		for (let i = 0; i < MAX; i += INC) {
			if (i & 3 !== 0) { // trying to cause lots of branch mispredictions
				count++
			}
		}
		return count
	}
}