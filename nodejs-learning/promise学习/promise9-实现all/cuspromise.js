/**
 * 自定义promise
 */
 const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTRD'
}

// 判断一个实例 是不是 promise  就看他有没有then方法

//我们的promise按照规范来写 就能和别人的promise共用
//x 就是 then的返回值（调用then时的返回值）
function resolvePromise(x, promise2, resolve, reject) {
    // promise A+ 
    //2.3.1  If promise and x refer to the same object, reject promise with a TypeError as the reason.
    if (promise2 === x) { //防止自己等待自己
        return reject(new TypeError('出错了'))
    }
    //看x是普通值还是promise  如果是promise要采用他的状态
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        //x可以是一个对象 或者 函数
        let called; //避免成功和失败都被调用（防止有不规范的promise会成功失败都调用） 
        try {
            let then = x.then //看一下这个对象是否有then方法
            if (typeof then === 'function') {
                //then是函数 我就认为这个x是promise 
                //如果x是promise 那么就采用他的状态
                then.call(x, function (y) { //调用返回的promis 用它的结果 作为下一次then的结果
                    if (called) return;
                    called = true

                    //递归解析成功后的值 直到它是一个普通值 为止
                    resolvePromise(y, promise2, resolve, reject) //如果y也是一个promise【即外部调用resolve(new Promise())】
                }, function (r) {
                    if (called) return;
                    called = true
                    reject(r) //直接调用promise2的reject
                })
            } else {
                resolve(x) //此时x就是一个普通对象 
            }
        } catch (error) {
            if (called) return;
            called = true
            reject(error) //取then的时候 出错了，如下例子：
            //给x定义了一个属性 then，then里面可能有get方法
            // Object.defineProperty('x','then',{
            //     get(){
            //         throw new Error('')
            //     }
            // })
        }
    } else {
        resolve(x) //x是个原始数据类型 不是promise
    }

    //不是promise直接调用resolve
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING; //状态默认pending
        this.value = undefined; //成功原因
        this.reason = undefined; //失败原因
        this.onFulfilledCallbacks = []; //被异步调用时 来保存成功的回调函数
        this.onRejectedCallbacks = []; //被异步调用时 来保存失败的回调函数
        const resolve = (value) => {
            if(value instanceof Promise){  //如果resolve/reject 传入的还是一个promise
                    return value.then(resolve,reject)
            }

            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FULFILLED
                this.value = value
                //发布
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED
                this.reason = reason
                //发布
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            //出错走失败逻辑
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        //避免多次调用then时  中间有then不传参，而导致最后拿不到数据
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        console.log(error)
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === STATUS.PENDING) { //如果在定时器中 延时调用成功或失败函数，会走到这里,因为状态默认pending
                //装饰模式 切片编程
                this.onFulfilledCallbacks.push(() => { //todo...
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
    catch(err){//默认没有成功，只有失败
        return this.then(null,err)
    }
    static resolve(val){
        return new Promise((resolve,reject)=>{
            resolve(val)
        })
    }
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason)
        })
    }
}

//安装promise测试包
//npm install promises-aplus-tests -g
//安装之后 测试执行  promises-aplus-tests promise.js

//测试时 会调用这个方法
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise