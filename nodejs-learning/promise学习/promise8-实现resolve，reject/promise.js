const Promise = require('./cuspromise')

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})

//Promise.resolve 可以等待一个promise执行完毕
// Promise.resolve(p).then(data => {
//     console.log(data)
// })

Promise.reject(p).catch(data=>{
    console.log(data)
})