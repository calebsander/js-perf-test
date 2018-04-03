const LENGTH = 10
const arr = new Array(LENGTH).fill(0).map((_, i) => i)
const index1 = (Math.random() * LENGTH) | 0, index2 = (index1 + (LENGTH >> 1)) % LENGTH

//Swaps back so as not to modify the array
module.exports = {
	temp() {
		const temp = arr[index1]
		arr[index1] = arr[index2]
		arr[index2] = temp

		const temp2 = arr[index1]
		arr[index1] = arr[index2]
		arr[index2] = temp2
	},
	xor() {
		arr[index1] ^= arr[index2]
		arr[index2] ^= arr[index1]
		arr[index1] ^= arr[index2]

		arr[index1] ^= arr[index2]
		arr[index2] ^= arr[index1]
		arr[index1] ^= arr[index2]
	}
}