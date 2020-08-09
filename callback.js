const sayBye=function(name){
    console.log('byebye '+name)
}
function callFunction(fun,name){
    fun(name)
}
callFunction(sayBye,'chenli')