const ITEMS = 1e4

module.exports = {
	alloc() {
		const result = new Array(ITEMS)
		for (let i = 0; i < ITEMS; i++) result[i] = i
	},
	noAlloc() {
		const result = []
		for (let i = 0; i < ITEMS; i++) result[i] = i
	}
}