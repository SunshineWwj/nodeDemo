/**
 * 把一些异步的api转化成 promise的方式（只针对node写法）
 * 
 * 如：读文件 fs.readFile('./name.txt','utf-8',function(err,data){})
 * 转化成 fs.readFile().then(data=>{},err=>{})
 */

const fs = require('fs')
const util=require('util')  //node内置的

function promisify(fn) { //高阶函数  fs.readFile
    return function (...args) {  //'./name.txt', 'utf-8'
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {  //fsreadFile('./name.txt', 'utf-8')
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}
// const readFile = promisify(fs.readFile); //怎么将node的api 转化成 promise api
// readFile('./name.txt', 'utf-8').then(data => {
//     console.log('succ:', data)
// }, err => {
//     console.log('err:', err)
// })

//promisifyAll 这个方法node没有内置
function promisifyAll(target) {   
    //等价于Object.keys(),Object.defineProperty()   低版本的  
    // Reflect.defineProperty() 以后都尽量使用 Reflect里面的属性方法   高版本
    Reflect.ownKeys(target).forEach(key => {
        if (typeof target[key] === 'function') {
            //将传入的target对象中的所有属性方法 变成以Async结尾的promise方法
            // target[key + 'Async'] =util.promisify(target[key])  可以使用node内置的util里的promisify
            target[key+'Async']=promisify(target[key]) //自己写的promisify
        }
    })
    return target
}
let obj = promisifyAll(fs);
obj.readFileAsync('./name.txt', 'utf-8').then(data => {
    console.log('succ:', data)
}, err => {
    console.log('err:', err)
})

