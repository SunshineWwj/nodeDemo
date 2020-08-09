var http =require('http');
var fs=require('fs')
// var server=http.createServer(function(request,response){
//     console.log('Request received');
//     response.writeHead(200,{'Content-Type':'text/plain'});//设置响应类型（纯文本） 让浏览器知道以什么方式解析
//     response.write('hello from out application');//返回信息
//     response.end();//结束
// })

//响应纯文本类型
var onRequest=function(request,response){
    console.log('Request received');
    response.writeHead(200,{'Content-Type':'text/plain'});//设置响应类型（纯文本） 让浏览器知道以什么方式解析
    //①可以这样
    // response.write('hello from out application');//返回信息
    // response.end();//结束
    //②也可以直接这样
    response.end('hello from out application');
}

//响应json类型
var onRequest2=function(request,response){
    console.log('Request received');
    response.writeHead(200,{'Content-Type':'application/json'});//设置响应类型（json） 让浏览器知道以什么方式解析
    var myObj={
        name:'wwj',
        job:'coder',
        age:27
    }
    response.end(JSON.stringify(myObj));//结束
}

//响应html类型
var onRequest3=function(request,response){
    console.log('Request received');
    response.writeHead(200,{'Content-Type':'text/html'});//设置响应类型（html） 让浏览器知道以什么方式解析
    var myReadStream=fs.createReadStream(__dirname+'/httpHtml.html','utf8');
    myReadStream.pipe(response);
}

function startServer(){
    var server=http.createServer(onRequest3);
    server.listen(3000,'127.0.0.1');
    console.log('server started on port 3000');
}
module.exports.startServer=startServer;