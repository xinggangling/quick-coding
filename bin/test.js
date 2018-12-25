#!/usr/bin/env node

// 引入依赖
var program = require('commander');
 
// 定义版本和参数选项
program
  .version('0.1.0', '-v, --version')
  .option('-t, --test', 'test 0xg')
  .option('-i, --init', 'init something')
  .option('-g, --generate', 'generate something')
  .option('-r, --remove', 'remove something');
 
// 必须在.parse()之前，因为node的emit()是即时的
program.on('--help', function(){
 console.log('  Examples:');
  console.log('');
  console.log('    this is an example');
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
  console.log('program.test')
}
