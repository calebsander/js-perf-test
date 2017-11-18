const MAX = 1000

module.exports = {
	array() {
		const result = []
		for (let i = 0; i < MAX; i++) result.push(i)
		for (let i of result) i++ //make sure iterated value is being used
	},
	set() {
		const result = new Set
		for (let i = 0; i < MAX; i++) result.add(i)
		for (let i of result) i++ //make sure iterated value is being used
	}
}