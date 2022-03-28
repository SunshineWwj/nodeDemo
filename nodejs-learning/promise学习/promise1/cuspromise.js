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
        const resolve = (value) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FULFILLED
                this.value = value
            }
        }
        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED
                this.reason = reason
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
        if (this.status === STATUS.FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === STATUS.REJECTED) {
            onRejected(this.reason)
        }
    }
}
module.exports = Promise