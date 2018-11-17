class ArrayQueue {
	constructor(size) {
		this.items = new Array(size)
		this.head = this.tail = 0
	}
	push(item) {
		this.items[this.tail] = item
		this.tail = (this.tail + 1) % this.items.length
		if (this.tail === this.head) throw new Error('Queue not big enough')
	}
	pop() {
		if (this.head === this.tail) throw new Error('Queue empty')
		const head = this.items[this.head]
		this.head = (this.head + 1) % this.items.length
		return head
	}
}

const MAX_INSERT = 10
const QUEUE_SIZE = 40

module.exports = {
	arrayQueue() {
		const q = new ArrayQueue(QUEUE_SIZE)
		let sum = 0
		for (let i = 0; i <= MAX_INSERT; i++) {
			for (let j = MAX_INSERT - i; j; j--) q.push({value: j})
			for (let j = i; j; j--) sum += q.pop().value
		}
		return sum
	},
	set() {
		const q = new Set
		let sum = 0
		for (let i = 0; i <= MAX_INSERT; i++) {
			for (let j = MAX_INSERT - i; j; j--) q.add({value: j})
			for (let j = i; j; j--) {
				const [item] = q
				q.delete(item)
				sum += item.value
			}
		}
		return sum
	}
}