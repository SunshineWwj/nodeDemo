let fs=require('fs').promises

async function read() {
    let name = await fs.readFile('./name.txt', 'utf-8')
    let age = await fs.readFile(name, 'utf-8')
    return age
}

//async 方法执行后返回的是 一个promise
read().then(data=>{
    console.log(data)
}).catch(err=>{
    console.log('err:',err)
})

//async+await 是 generator的语法糖
