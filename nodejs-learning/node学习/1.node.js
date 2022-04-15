//node 中的全局对象 
//浏览器中的this 直戴的是window，服务端中的this指代的是global
//默认我们访问是在文件中访问的this，内部被更改了 所以不是global  是module.exports


//函数中(闭包) 指向调用者 这里就是global
function a(){
    console.log(this)
}
a()


//require module exports __dirname __filename
//全局变量 是可以直接再文件中不声明就直接访问的变量  但是global上的属性叫全局变量

//process中属性
/**
 * platform  平台，可以区分操作系统
 * 用途：根据不同平台 操作系统文件的
 * */
console.log(process.platform);  //win32  windows  / drawin linux

/**
 * process.cwd()
 * 获取当前执行node命令的目录,可以找到当前目录下的某个文件
 * 
 * process.chdir('xxx')
 * 修改当前工作目录
 * 
 * process.env 代表当前系统环境变量
 * 根据不同的环境变量做配置 
 * 如何设置环境变量  
 *      如果是windows 可以通过set xxx=xxx 
 *      如果是mac  通过 export xxx=xxx
 * cross-env 这是一个第三方模块用于设置环境变量
 * 
 * 
 * process.argv 运行代码时传入的参数
 */
console.log(process.cwd()); //c:\Users\95891\Desktop\demo 可改变
// console.log(process.chdir('xxx'));//可以修改文件的目录

//比如webpack 打包时 区分开发还是生产
process.env.NODE_ENV = 'production';
if(process.env.NODE_ENV==='production'){
    console.log('生产')
}else{
    console.log('开发')
}


console.log(process.argv) 
//打印结果如下 前两个是固定的 后面是执行命令( node 1.node.js a b c d)时传入的参数
/**
 * [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\95891\\Desktop\\demo\\nodejs-learning\\node学习\\1.node.js',
  'a',
  'b',
  'c',
  'd'
]
 */
console.log(process.argv.slice(2))  //可以获取当前用户传入的所有参数

/**
 * 比如运行时传入--port  --config，
 * 即执行node 1.node.js --port 300 --config 'xx.js' 
 * => 拿到传入的参数 => console.log(process.argv.slice(2))  => [ '--port', '300', '--config', "'xx.js'" ]
 * 然后将其转换成一个配置对象 => { port: '300', config: "'xx.js'" }
 */
let config=process.argv.slice(2).reduce((memo,current,index,arr)=>{
    //判断以--开头的作为对象名称，下一个就作为对象值
    if(current.startsWith('--')){
        memo[current.slice(2)]=arr[index+1]
    }
    return memo
},{})
console.log(config) //=>{ port: '300', config: "'xx.js'" }



