/**
 * Promise 链式调用
 */
const fs = require('fs');
const {
    resolve
} = require('path');

const Promise = require('./cuspromise')
//会形成回调地狱
// fs.readFile('./name.txt', 'utf-8', (err, data) => {
//     if (err) {
//         //todo...
//     }
//     fs.readFile('./name.txt', 'utf-8', (err, data) => {
//         if (err) {
//             //todo...
//         }
//     })
// })

//避免回调地狱  给读文件（fs.readFile()）包一层，让其拥有.then方法
function read(...args) {
    return new Promise((resolve, reject) => {
        // fs.readFile(...args, (err, data) => {
        //     if (err) {
        //         return reject(err)
        //     }
        //     resolve(data)
        // })
        resolve('ok')
    })
}

read('./name.txt', 'utf-8')
    .then(data => {
        console.log('succ:', data)
        // throw new Error('抛出异常')
        // return 100
    }, err => {
        console.log('err:', err)
        return 200
    })
    .then(data => {
        console.log('then2succ:',data)
    }, err => {
        //上一个then  抛出异常 或者 执行reject
        //才会进来
        console.log('then2err:',err)
    })

/**
 * promise 的链式调用问题解析
 * 1.如果then方法中（“成功”或“失败”）返回的不是一个promise，则会将返回的值传递给
 * 外层下一次then的“成功(resolve)”结果
 * 
 * 2. 如果then方法中 的方法执行出错了 抛出异常，会走到下一次then的“失败(reject)”结果中
 * 3. 如果第一次then返回的是一个promise，会用这个promise的结果作为下一次then的成功或失败
 *  
 * 4.catch 就是then的别名 没有成功回调只有失败回调 （找最近的优先处理 处理不了找下一层的失败回调）
 * 
 * 5.then方法为什么可以链式调用？ 每次调用then都返回一个新的promise
 *   总结：
 *     如果想走到第二次then的失败回调中，有哪几种情况？
 *      1》第一次then 抛异常
 *      2》第一次then 返回的promise失败了 
 *         即第一次then 返回的promise执行了失败回调（promise.reject）
 */

//情况1
// read('./name.txt', 'utf-8').then(data => {
//         // return 100;
//         throw new Error('抛出异常')
//     }, err => {
//         console.log('error:', err)
//     })
//     .then(data => {
//         console.log('第二次then的结果：', data)
//     }, (err) => {
//         console.log('情况1/第二次then失败回调：', err)
//     })

// //情况二：
// read('./name.txt', 'utf-8').then(data => {
//         // return Promise.reject('aaaa')
//         return read(data, 'utf-8')
//     }, err => {
//         console.log('error:', err)
//     })
//     .then(data => {
//         console.log('第二次then的结果：', data)
//     }, (err) => {
//         console.log('情况2/第二次then失败回调：', err)
//     })