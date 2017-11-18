const randomString = require('../random-string')

const KEYS = 1000
const KEY_LENGTH = 10

const obj = {}
for (let i = 0; i < KEYS; i++) {
	let item
	switch (i % 5) {
		case 0:
			item = 123
			break
		case 1:
			item = 'abc'
			break
		case 2:
			item = true
			break
		case 3:
			item = [1, 2, 3]
			break
		case 4:
			item = null
	}
	obj[randomString(KEY_LENGTH)] = item
}

module.exports = {
	forIn() {
		let item
		for (const key in obj) item = obj[key]
	},
	guardedForIn() {
		let item
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) item = obj[key]
		}
	},
	objectKeys() {
		let item
		for (const key of Object.keys(obj)) item = obj[key]
	}
}