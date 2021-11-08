// 堆：存引用类型
// 栈：基本数据类型和代码的执行环境

// let a={};
// b='0';
// c=0;
// a[b]='珠峰';
// a[c]='培训';
// console.dir(a[b]);  //输出培训 因为对象的属性名不能重复，重复会被覆盖（'0'在对象key中等价于0）

// let a={};
// b={
//     n:1
// };
// c={
//     m:2
// }
// a[b]='珠峰';  //  =>{'[object object]':'珠峰'}
// a[c]='培训';  //  =>{'[object object]':'培训'}
// console.dir(a[b]);//=>'培训' 对象属性名相同值会被覆盖
//  //对象存对象 会变成【对象.toString()】即 "{[object object]:xxx}",

// console.dir({}.toString());


// var test =(function(i){
//     return function(){
//         // alert(i*=2); //输出'4'  因为alert会自动转为字符串，自动toString()
//         console.dir(i*=2);//输出4
//     }
// })(2);
// test(5); 

// var a=0,b=0;
// function A(a){
//     A=function(b){
//         console.dir(a+b++);
//     }
//     console.dir(a++);
// }
// A(1);
// A(2);

var i=1;

console.dir(i++ - ++i);

