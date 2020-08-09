var fs =require('fs');

var myReadStream=fs.createReadStream(__dirname+'/streams.txt','utf-8'); //文件读取流
var myWriteStream=fs.createWriteStream(__dirname+'/writeStreams.txt'); //文件写入流

//也可以这样设置编码格式
// myReadStream.setEncoding('utf-8');
//①
// var data='';
// //监听文件读取事件
// myReadStream.on('data',function(chunk){
//     // data+=chunk;
//     myWriteStream.write(chunk);

// })
// //监听文件读取结束事件
// myReadStream.on('end',function(){
//     // console.log(data);
// })

//②
// var writeData='hello world';
// myWriteStream.write(writeData);
// myWriteStream.end();
// myWriteStream.on('finish',function(){
//     console.log('finished');
// })

//③
myReadStream.pipe(myWriteStream)
