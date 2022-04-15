/**
 * generator 可以实现暂停功能  ：redux+saga =>dva
 */

//yield 表示的是产出* generator函数（迭代器函数）
function* gen() {
    yield 1
    yield 2
    yield 3
    return 100
}
let it = gen()
console.log(it.next()) //{ value: 1, done: false }
console.log(it.next()) //{ value: 2, done: false }
console.log(it.next()) //{ value: 3, done: false }
console.log(it.next()) //{ value: 100, done: true }