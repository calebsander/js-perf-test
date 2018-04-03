const MAX = 10000

module.exports = {
	index() {
		const result = []
		for (let i = 0; i < MAX; i++) result[i] = i
	},
	push() {
		const result = []
		for (let i = 0; i < MAX; i++) result.push(i)
	},
	map() { //not exactly a fair comparison, as this pre-allocs the entire array
		const result = new Array(MAX).fill(0).map((_, i) => i)
	},
	unshift() { //just for shits and giggles
		const result = []
		for (let i = 0; i < MAX; i++) result.unshift(i)
	},
	concat() {
		let result = []
		for (let i = 0; i < MAX; i++) result = result.concat([i])
	},
	spread() {
		let result = []
		for (let i = 0; i < MAX; i++) result = [...result, i]
	}
}