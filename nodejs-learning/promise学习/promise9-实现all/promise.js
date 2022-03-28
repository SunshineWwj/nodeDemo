let fs = require('fs').promises

let getName = fs.readFile('./name.txt', 'utf-8');
let getAge = fs.readFile('./readme.txt', 'utf-8');

function isPromise(val) {
    return val && (typeof val.then === 'function')
}

Promise.all = function (params) {
    return new Promise((resolve, reject) => {
        let result = [];
        let times = 0;
        function processData(index, val) {
            result[index] = val; //将索引和值对应  存入结果中
            if (++times === params.length) {
                resolve(result)
            }
        }

        for (let i = 0; i < params.length; i++) {
            let p = params[i];
            if (isPromise(p)) { //promise
                p.then(data => {
                    processData(i, data)
                }, err => {
                    reject(err)
                })
            } else {
                processData(i, p) //普通值
            }
        }
    })
}

//Promise.all 方法返回的是一个promise，其中一个失败就真的失败了
Promise.all([1, getName, getAge, 2]).then(data => {
    console.log(data)
})
//fetch 是不能中断请求的
