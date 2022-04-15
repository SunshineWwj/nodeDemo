let fs = require('fs').promises
//async + await === generator + co 
//switch-case => babel编译后就是把一个函数分成多个case 采用指针的方式向下移动
function* read() {
    let name = yield fs.readFile('./name.txt', 'utf-8')
    let age = yield fs.readFile(name, 'utf-8')
    return age
}

function co(it) { //异步迭代 采用函数的方式
    return new Promise((resolve, reject) => {
        function step(data) {
            let {
                value,
                done
            } = it.next(data);
            if (!done) {
                Promise.resolve(value).then(data => {
                    step(data)
                }, reject)
            } else {
                resolve(value) //将最终的结果抛出去
            }
        }
        step()
    })
}

co(read()).then(data => {
    console.log(data)
}).catch(err => {
    console.log('err:',err)
})

//简化下面一坨的写法 重新封装一个新的方法来拿到read()的返回结果，如上co()
// let it = read();
// let {
//     value,
//     done
// } = it.next()
// // console.log(value,done) //Promise { <pending> } false

// //每一次next之后输出（yield）的值 可以作为下一次next的参数传入
// value.then(data => {
//     let {
//         value,
//         done
//     } = it.next(data) //age.txt    data 上一次yield的值
//     value.then(data => {
//         let {
//             value,
//             done
//         } = it.next(data)
//         console.log(data) //11
//     })
// })