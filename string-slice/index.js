const STRING = 'abcdefghij'.repeat(1e4) //1e5 characters

module.exports = {
    substr() {
        const str = STRING.substr(25e3, 50e3)
        return str[0]
    },
    substring() {
        const str = STRING.substring(25e3, 75e3)
        return str[0]
    },
    slice() {
        const str = STRING.slice(25e3, 75e3)
        return str[0]
    }
}