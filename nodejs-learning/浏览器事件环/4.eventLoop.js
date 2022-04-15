//事件环 （代码执行顺序）

//计算机里面 调度任务和分配任务的单位是 进程  （比如QQ vscode  都是一个进程）
//进程中 包含着很多线程
//浏览器是一个 多进程模型 每个页签都是一个进程
    //主进程=》用户界面
    //渲染进程 =》 浏览器内核 js ui渲染
    //处理请求的 网络进程 绘图进程 GPU渲染进程  插件也是独立进程


//渲染进程 -包含多个线程
//js的“主”线程 是 单线程的  ui渲染 ， ui渲染和js共用一个线程 互斥的   从上到下执行
//事件  、定时器（v8浏览器提供的）、ajax 都是其他单独线程 包含在进程中
//webworker 工作线程 和 主线程 不平等 （主线程能操作dom）


//所有的异步方法 分为宏任务（ 宿主环境(浏览器)提供的异步方法都是宏任务） 、
//微任务(语言本身提供的是微任务  promise.then（ES6标准提供的）)

//整个宏任务和微任务的调度顺序？
    //默认先执行宏任务（script脚本），然后清空所有的微任务（微任务全部执行完毕）
    //微任务执行完后开始 页面渲染（不是每次都渲染）
    //然后取出一个宏任务执行，执行过程中可能再次产生宏任务和微任务。。。不停的循环

//0000  4444 1111 3333 2222
console.log(0000)
setTimeout(() => {
    console.log(1111)
     Promise.resolve().then(data=>console.log(2222))
    console.log(3333)
}, 0);
console.log(4444)


//promise1 setTimeout2  promise2 setTimeout1
Promise.resolve().then(() => {
    console.log('promise1')
    setTimeout(() => {
        console.log('setTimeout1')
    }, 0);
})
setTimeout(() => {
    console.log('setTimeout2')
    Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0);



