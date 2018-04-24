const SEGMENTS = 100
const strs = new Array(SEGMENTS).fill().map((_, i) => 'a'.repeat(i))

module.exports = {
	append() {
		let str = ''
		for (let i = 0; i < SEGMENTS; i++) str += strs[i]
		return str
	},
	join() {
		const segments = []
		for (let i = 0; i < SEGMENTS; i++) segments.push(strs[i])
		return segments.join('')
	}
}