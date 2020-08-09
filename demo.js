const asyncFunction=function(count){
    console.log('count:',count%2)
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(count%2)
                resolve('成功。。。')
            else
                reject('失败。。。' )
        },2000)
    })
}
async function demo(){
   
    for(var i=0;i<5;i++){
        console.log('111')
        await asyncFunction().
        then((res)=>console.log(res))
        
    }
}
const array=[1,2,3,4,5]
async function demo1(){
    for (const item of array) {
        console.log(item);
        await asyncFunction(item)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }
}

function demo2(){
    // try {
        array.forEach(element => {
            console.log(element);
            if(element===3)
                throw new Error('退出');
        });
    // } catch (error) {
    //     console.log(error)
    // }
   
    console.log(11111)
    
}


function demo999(){
    try {
        demo2();
        console.log("demo2 异常未捕获到")
    } catch (e) {
        console.log(e.msg)
        console.log(e)
    }
}
// demo();
// demo1();
demo999();