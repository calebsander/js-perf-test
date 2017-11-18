const MIN_CHAR = ' '.charCodeAt(0), MAX_CHAR = 'z'.charCodeAt(0)

module.exports = characters => {
	let str = ''
	for (let i = 0; i < characters; i++) {
		str += String.fromCharCode(Math.floor(Math.random() * (MAX_CHAR - MIN_CHAR)) + MIN_CHAR)
	}
	return str
}