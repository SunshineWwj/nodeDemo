// console.log(__dirname);
// console.log(__filename);
// let  time=0;
// setTimeout(()=>console.log('2 seconds have passed'),2000)
// const timer=setInterval(() => {
//     time+=2;
//     console.log(time+'seconds have pased');
//     if(time>6){
//         clearInterval(timer);
//     }
// }, 2000);
var stuff=require('./exportModules');

console.log(stuff.counter(3,4));
console.log(stuff.sayHi());

