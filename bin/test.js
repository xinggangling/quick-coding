#!/usr/bin/env node

// 引入依赖
var program = require('commander');
const path = require('path');
 
// 定义版本和参数选项
program
  .version('0.1.0', '-v, --version')
  .option('-t, --test [name]', 'test 0xg')
  .option('-i, --init', 'init something')
  .option('-g, --generate', 'generate something')
  .option('-r, --remove', 'remove something');

program
  .command('speak')
  .description('speak dajuzi')
  .action(function() {
    require('./speak')
  })
  // .option('-f, --file <file>', '待编译wpy文件')
  // .option('-s, --source <source>', '源码目录')
  // .option('-t, --target <target>', '生成代码目录')
  // .option('-o, --output <type>', '编译类型：web，weapp。默认为weapp')
  // .option('-p, --platform <type>', '编译平台：browser, wechat，qq。默认为browser')
  // .option('-w, --watch', '监听文件改动')
  // .option('--no-cache', '对于引用到的文件，即使无改动也会再次编译');
 
// 必须在.parse()之前，因为node的emit()是即时的
program.on('--help', function(){
 console.log('  Examples:');
  console.log('    zhu');
  console.log('');
});
 
program.parse(process.argv);

// console.log(process.argv)
 
if(program.init) {
  console.log('init something')
}
 
if(program.generate) {
  console.log('generate something')
}
 
if(program.remove) {
  console.log('remove something')
}

if (program.test) {
  console.log(program.test)

  var fileName = path.resolve(program.test)
  console.log(fileName)
}

if (program.watch) {
  console.log(program.watch)
}
