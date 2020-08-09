var events=require('events');
var util=require('util')
// var myEmitter=new events.EventEmitter();

// myEmitter.on('someEvent',function(msg){
//     console.log(msg)
// });

// myEmitter.emit('someEvent','welcome to node.js')

var Person=function(name){
    this.name=name
}
//Person对象继承这个事件触发对象，即Person也可以绑定事件
util.inherits(Person,events.EventEmitter);

var xiaoming=new Person('xiaoming');
var lili=new Person('lili');
var lucy=new Person('lucy');


console.log(new Person('lili')); //Person { name: 'lili' }
console.log(xiaoming); //Person { name: 'xiaoming' }


var personArray=[xiaoming,lili,lucy];
console.log('personArray:',personArray)
//log: personArray: [
//     Person { name: 'xiaoming' },
//     Person { name: 'lili' },
//     Person { name: 'lucy' }
//   ]



personArray.forEach(person=>{
    person.on('speak',function(message){
        console.log(person.name+' said '+message);
    })
})

xiaoming.emit('speak','i am xiaoming');
lili.emit('speak','i want to go to bed')