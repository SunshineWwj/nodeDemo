
const Promise = require('./cuspromise')
 
//判断返回值和promise2的关系

// let p=new Promise((resolve,reject)=>{
//     resolve('6666')
// }).then(data=>data).then(data=>data).then(data=>{
//     console.log(data)
// },err=>{
//     console.log(err)
// })

let p=new Promise((resolve,reject)=>{
    resolve('6666')
})
.then()//中间几个then都没传参 需要Promise中去处理 判断 传参是函数 就调用函数 否则直接返回(即data => data)
.then()  
.then(data=>{
    console.log('succ:',data)
},err=>{
    console.log('err:',err)
})