const fs = require('fs')

function promisify(fn){ //高阶函数
    return function(...args){
        return new Promise((resolve,reject)=>{
            fn(...args,function(err,data){
                if(err)  reject(err)
                resolve(data)
            })
        })
    }
}
const readFile = promisify(fs.readFile);//怎么将node的api 转化成 promise api
readFile('./name.txt', 'utf-8').then(data => {
    console.log('succ:', data)
}, err => {
    console.log('err:', err)
})