const BYTES_TO_COPY = 1 << 20
const from = new ArrayBuffer(BYTES_TO_COPY)
new Int8Array(from).fill(-1) // set all bits to 1

module.exports = {
	by8() {
		const to = new ArrayBuffer(BYTES_TO_COPY)
		new Uint8Array(to).set(new Uint8Array(from))
		return to
	},
	by16() {
		const to = new ArrayBuffer(BYTES_TO_COPY)
		new Uint16Array(to).set(new Uint16Array(from))
		return to
	},
	by32() {
		const to = new ArrayBuffer(BYTES_TO_COPY)
		new Uint32Array(to).set(new Uint32Array(from))
		return to
	},
	by64() {
		const to = new ArrayBuffer(BYTES_TO_COPY)
		new BigUint64Array(to).set(new BigUint64Array(from))
		return to
	}
}
if (typeof BigUint64Array === 'undefined') delete module.exports.by64