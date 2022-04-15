const program = require('commander') //解析用户传递的参数
program.name('wwj')
program.option('-p, --port <v>','set server port');//设置option(简写，全写，值，解释)
program.command('rm').action(()=>{
    console.log('执行删除')
})
program.parse(process.argv)
console.log(program._optionValues.port)

/**
 * 执行 node 2.commander.js --help
 * =>
 *  Usage: wwj [options]
 *  Options:
        -p, --port <v>  set server port
        -h, --help     display help for command
 * 执行 node 2.commander.js -p 3000
        =>  3000
   执行 node 2.commander.js rm -p 3000
        =>  执行删除
            3000
 */