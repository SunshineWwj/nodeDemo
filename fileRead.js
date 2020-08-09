var fs = require('fs');

// sync表示同步执行，即按顺序一步步执行，先读取完文件，在执行下面的，即如果文件较大，那就会等很长时间才执行下面的finished
var readMe=fs.readFileSync('readme.txt','utf-8');//读取

// fs.writeFileSync('writeme.txt',readMe);//把读取的内容写入到writeme文件中

console.log(readMe);

console.log('finished')//结果是先打印you read me,然后打印finished（同步按顺序执行）



var readMe=fs.readFile('readme.txt','utf-8',function(err,data){
    console.log(data)
});//异步读取

console.log('finished');////结果是先打印finished,然后打印you read me（同步按顺序执行）

/**
同步操作 会阻塞主线程，
所以一般耗时的操作 会在执行到的时候 先去事件队列里面注册一个事件，然后就执行下面的步骤，
当主线程有空闲的时候 就去事件队列中拿到注册的事件 然后从线程池开启另一个线程去执行，执行完成后通知主线程
*/

fs.mkdir('stuff',function(){   //创建stuff文件夹
    fs.readFile('readme.txt','utf-8',function(err,data){   //读取文件内容
        fs.writeFile('./stuff/writeme.txt',data,function(){  //将读取的文件内容写入到stuff/writeme.txt文件中
            console.log('copy successfully');
        })
    })
})