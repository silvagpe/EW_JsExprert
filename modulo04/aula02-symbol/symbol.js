const assert = require('assert')

//--keys
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

console.log('getting normal Objects:', user.userName)

// sempre único em nivel de endereco de memoria
//isso quer dizer que mesmo que seja crido um symbol com o mesmo nome, ele não é o mesmo apontamento da memória
console.log("Symbol vlaue:",Symbol("userName"))
console.log('getting by Symbol:', user[Symbol("userName")])


console.log('getting by symbol key:', user[uniqueKey])
user[uniqueKey] = 'value for symbol - changed'
console.log('getting by symbol key - changed:', user[uniqueKey])


assert.deepStrictEqual(user.userName, 'value for normal Objects')

// // sempre único em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol - changed')

// é dificil de pegar, mas nao é secreto!  
// exemplo, se usar um brack point em modo debug conseguimos ver o valor
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// --- keys


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
// well-Known Symbols
const obj = {
    [Symbol.iterator]: ()=>({
        items : ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

//Teste com o for para interar sobre os items do obj
for (const item of obj){
    console.log(item)
}

//Asserção com descontrução
assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol("kItems")
class MyDate {
    constructor(...args){
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType){
        if (coercionType != "string") throw new TypeError()

        const items = this[kItems]
                        .map(item => new Intl
                            .DateTimeFormat("pt-BR", {month:"long", day:"2-digit", year:"numeric"})
                            .format(item) )
        return new Intl.ListFormat("pt-BR", {style:"long", type:"conjunction"}).format(items)
    }

    *[Symbol.iterator](){
        for (const item of this[kItems]){
            yield item
        }
    }

    async *[Symbol.asyncIterator](){
        const timeout = ms => new Promise(r=> setTimeout(r, ms));
        for (const item of this[kItems]){
            await timeout(1000)
            yield item.toISOString()
        }
    }

    get [Symbol.toStringTag](){
        return "What?"
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02),
]

console.log(myDate.toString())
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object What?]')
assert.throws(() => myDate + 1, TypeError)

// coercao explicita para chamar o toPrimitive
console.log(String(myDate))
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o iterator!
console.log([...myDate])
assert.deepStrictEqual([...myDate], expectedDates)

;(async() => {
    for await(const item of myDate) {
        console.log('asyncIterator: ', item)
    }
})()


;(async () => {
    const dates = await Promise.all([...myDate])
    console.log(';async () =>',dates);
    assert.deepStrictEqual(dates, expectedDates)
})()