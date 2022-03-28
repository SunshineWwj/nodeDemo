const sayBye = function(name) {
    console.log('byebye ' + name)
}

function callFunction(fun, name) {
    fun(name)
}
callFunction(sayBye, 'chenli')


//---------------------------------------------------------------
function core(a, b, c) {
    console.log('core....', a, b, c)
}
//每个类都有一个原型 所有实例都有一个_proto_
Function.prototype.before = function(beforeFn) {
    //this=core   //this的指向  看调用者
    return (...args) => { //箭头函数中没有this 没有arguments 没有prototype
        beforeFn();
        this(...args);
    }
}

let newFn = core.before(() => {
    console.log('core before....')
})
newFn(1, 2, 3);

//-------------------------------------------------------------------

//判断元素的类型
//typeof , constructor , instanceof , Object.ptototype.toString.call()
function isType(type) { //内置参数的功能
    return (val) => {
        return Object.prototype.toString.call(val) === `[object ${type}]`
    }
}
//让方法更具体些  isNumber  isString
let utils = {};
['String', 'Number', 'Boolean'].forEach(type => {
    utils[`is${type}`] = isType(type)
});
console.log(utils.isNumber(123));
console.log(utils.isString(123));

/**
 * 柯里化函数    每次的入参都是一个参数
 *  sum(1)(2)(3)(4)(5)
 * 
 * 偏函数
 *  sum(1,2)(2)(3,4,5)
 * */
function sum(a, b, c, d, e, f) {

}