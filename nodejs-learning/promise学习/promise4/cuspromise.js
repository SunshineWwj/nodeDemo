/**
 * 自定义promise
 */
const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTRD'
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING; //状态默认pending
        this.value = undefined; //成功原因
        this.reason = undefined; //失败原因
        this.onFulfilledCallbacks = []; //被异步调用时 来保存成功的回调函数
        this.onRejectedCallbacks = []; //被异步调用时 来保存失败的回调函数
        const resolve = (value) => {
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
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.FULFILLED) {
                try {
                    let resu = onFulfilled(this.value)
                    resolve(resu)
                } catch (error) {
                    reject(error)
                }
            }
            if (this.status === STATUS.REJECTED) {
                try {
                    let resu = onRejected(this.reason)
                    reject(resu)
                } catch (error) {
                    reject(error)
                }
            }
            if (this.status === STATUS.PENDING) { //如果在定时器中 延时调用成功或失败函数，会走到这里,因为状态默认pending
                //装饰模式 切片编程
                this.onFulfilledCallbacks.push(() => { //todo...
                    try {
                        let resu = onFulfilled(this.value)
                        resolve(resu)
                    } catch (error) {
                        reject(error)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let resu = onRejected(this.reason)
                        resolve(resu)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
        return promise2
    }
}
module.exports = Promise