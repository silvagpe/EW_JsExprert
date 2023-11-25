const assert = require('assert')

function* calculation(arg1, arg2) {
    yield arg1 * arg2
}

function* main() {
    yield 'Hello'
    yield '-'
    yield 'World'

    //O * é usado para retornar o resultado da função (executar) em vez de retornar a função
    yield* calculation(20, 10)
}


const generator = main();
// console.log(generator.next()) //- {value: 'Hello', done: false}
// console.log(generator.next()) //- {value: '-', done: false}
// console.log(generator.next()) //- {value: 'World', done: false}
// console.log(generator.next()) //- {value: 200, done: false}
// console.log(generator.next()) //- {value: undefined, done: true}

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200])
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200])

// Async Interator
const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('hey dude')
}

//Usar o desconstrutor para ler todos os yield e então exibir no log
//Promise.all([...promisified()]).then(results => console.log('promisified: ', results))

//função para auto executar, é basicamente o mesmo comportamento acima, porém usando o for await
// ;(async ()=>{
//     //Passa por todos os valores do yield
//     for await(const item of promisified()){
//         console.log('for await: ', item.toString())
//     }
// })()


async function* systemInfo() {

    const file = await readFile(__filename)
    yield { file: file.toString() }

    const { size } = await stat(__filename)
    yield { size }

    const dir = await readdir(__dirname)
    yield { dir }
}

;(async ()=>{
    for await (const item of systemInfo()){
        console.log('systemInfo:', item)
    }
})()

