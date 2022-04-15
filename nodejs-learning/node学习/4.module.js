//node中的模块 核心 
//
/**
 * 模块规范有哪些？为啥有这些规范？
 * 1.开发时命名冲突问题  
 *      1》命名空间防止冲突（调用时不方便）  不推荐
 *      2》IIFE 自执行方式实现模块化  请求的处理
 *      AMD(require.js依赖前置)、CMD(sea.js依赖就近,，淘汰了)、commonjs、ESModule、UMD(amd+commonjs)
 * 
 *  import export  浏览器ES6
 *  require module.exports  node使用的（若想在node中使用es6Module,需要bebel编译）
 */


/**commonjs规范定义
 * 每一个文件都是一个模块
 * 要通过module.exports 导出需要给别人使用的结果
 * 导入需要的模块
*/

/**
 * node中的模块 划分了几类
 *      1.核心模块（fs内置模块）
 *      2.require()  （文件模块  自定义模块）
 *      3.第三方模块（需要安装）
 */


// 核心模块（很多） fs path vm  require内部是同步的
const fs = require('fs'); //一般有两种 同步 异步
const result= fs.readFileSync('./age.txt','utf-8');
const bool = fs.existsSync('./age.txt');//判断文件是否存在
console.log(result,bool)

//=========================================================================
const path=require('path')//处理路径

//传入一个相对路劲 得到一个绝对路径
console.log(path.resolve('age.txt'));//默认解析的路径 是以process.cwd()（当前工作目录），可以chdir修改
console.log(path.resolve(__dirname,'writeme.txt'));//__dirname  文件所在目录，不能更改
/**
 * =>
 *  c:\Users\95891\Desktop\demo\age.txt
    c:\Users\95891\Desktop\demo\nodejs-learning\node学习\writeme.txt
 */


/**
 * path.resolve 和path.join 都有拼接的功能
* 如果遇到带/的路径 resolve会认为是根路径 join则是拼接在一起
 */
console.log(path.resolve(__dirname,'writeme.txt','/'))  //c:\
console.log(path.join(__dirname,'writeme.txt','/'))//c:\Users\95891\Desktop\demo\nodejs-learning\node学习\writeme.txt\

console.log(path.extname('a.min.js'))  // .js 取后缀名
console.log(path.relative('ab','ab/a.js'))  // a.js  去掉相同的部分

console.log(path.dirname(__dirname))  // __dirname=path.dirname    c:\Users\95891\Desktop\demo\nodejs-learning
console.log('结果输出：',path.dirname,__dirname,__filename)



/** 
 * 
 * 
*/
const vm=require('vm')

let a = 100;
const log1 ='console.log(a)';
eval(log1)  //eval 执行时会查找上下文 所以找到了a的值


const log2='console.log(a)';
//new Function 可以产生一个执行环境 不依赖于外层作用域，必须包一层函数 模板引擎中会使用new Function
let fn=new Function(log2);
fn(); //ReferenceError: a is not defined

const log3='console.log(a)';
vm.runInThisContext(log3);//ReferenceError: a is not defined

const log4='console.log(111)';
vm.runInThisContext(log4);//  111


/**
 * vm.runInThisContext()  让字符串直接执行 并且在沙箱环境中
 * 模板引擎用的是 new Function + with
 */
