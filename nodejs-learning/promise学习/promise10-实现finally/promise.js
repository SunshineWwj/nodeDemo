//Promise.prototype.finally最终的  不是try catch finally

Promise.prototype.finally = function (callback) {
    return this.then(data => {
        //让函数执行 内部调用方法，如果方法是promise会等待其完成
        return Promise.resolve(callback()).then(() => data)
    }, err => {
        return Promise.resolve(callback()).then(() => {
            throw err
        })
    })
}

Promise.reject(123).finally(data => { //这里传入的函数 无论如何都会执行
    console.log('finally')
    //finally 可以返回一个promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 5000);
    })
}).then(data => {
    console.log('succ:', data)
}, err => {
    console.log('err:', err)
})