// function init() {
//     var name = "Mozilla";
//     var a={
//         name:'aaa'
//     } // name 是一个被 init 创建的局部变量
//     function displayName() { // displayName() 是内部函数，一个闭包
//         console.dir(name); // 使用了父函数中声明的变量
//         console.dir(a.name);
//     }
//     displayName();
// }
// init();

// function makeFunc() {
//     var name = "Mozilla";
//     function displayName() {
//         console.dir(name);
//     }
//     return displayName;
// }

// var myFunc = makeFunc();
// myFunc();

// function makeAdder(x) {
//     return function(y) {
//       return x + y;
//     };
//   }
  
//   var add5 = makeAdder(5);
//   var add10 = makeAdder(10);
//   console.log(add5(2));

// var Counter = (function() {
//     var privateCounter = 0;
//     function changeBy(val) {
//       privateCounter += val;
//     }
//     return {
//       increment: function() {
//         changeBy(1);
//       },
//       decrement: function() {
//         changeBy(-1);
//       },
//       value: function() {
//           console.dir(privateCounter)
//         return privateCounter;
//       }
//     }   
//   })();

function showHelp(help) {
    console.dir('11:',help)
  }
  
  function makeHelpCallback(help) {
      console.dir('aaa')
    return function() {
      showHelp(help);
    };
  }
  
  function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
  
    for (var i = 0; i < helpText.length; i++) {
      var item = helpText[i];
      (function(){
        makeHelpCallback(item.help);
      })(); 
    }
  }
  
  setupHelp();