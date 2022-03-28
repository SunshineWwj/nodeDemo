/**
 * Promise异步调用
 */
/**
 * Promise  是一个类 类中的构造函数需要传递一个executor 默认会执行
 * executor 有两个参数 分别是resolve，reject
 * 默认创建一个promise  状态就是pending fulfilled rejected  promise有三个状态
 * 调用成功和失败时，需要传递一个成功和失败的原因
 * 如果已经成功就不能失败了/如果已经失败了就不能成功了
 * 每一个promise实例 都有一个then方法
 * 如果抛出异常 按失败处理
 * */


const Promise = require('./cuspromise')
let p = new Promise((resolve, reject) => {
    console.log(111)
        // throw new Error('报错了')
    setTimeout(() => {
            resolve('延时调用成功'); //异步调用时 Promise会把调用的函数 存在数组里（订阅）
        }, 1000)
        // reject('失败了')

});
p.then((value) => { //成功的回调
    console.log('success:', value)
}, (err) => { //失败的回调
    console.log('fail:', err)
})
p.then((value) => { //成功的回调
    console.log('success:', value)
}, (err) => { //失败的回调
    console.log('fail:', err)
})
console.log(222)