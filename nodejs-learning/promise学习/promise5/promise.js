/**
 * Promise 链式调用
 */
const fs = require('fs');
const {
    resolve
} = require('path');

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

const Promise = require('./cuspromise')
let p = read('./name.txt', 'utf-8');
 
//判断返回值和promise2的关系
let promise2 = p.then(data => {
    console.log('succ', data);
    return new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            resolve(new Promise((resolve,reject)=>{
                resolve(new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        resolve('66666')
                    }, 1000);
                }))
            }))
        }))
    })
}, err => {
});

promise2.then(data => {
    console.log('then2succ:', data)
}, err => {
    console.log('err2:',err)
})