#!/usr/bin/env node
const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const inquirer = require('inquirer');
const log = (content) => console.log(chalk.green(content));
const opt = {
  初始化脚手架: 'init',
  启动项目: 'start',
  创建子项目: 'create',
  编译组件库: 'compile',
  版本发布: '',
  Eslint格式校验: '',
  退出: 'quit',
};
const question = [
  {
    type: 'rawlist' /* 选择框 */,
    message: '请选择操作?',
    name: 'operation',
    choices: Object.keys(opt),
  },
];
// 打印欢迎画面
clear();
log(
  figlet.textSync('Element 3!', {
    // font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  })
);
query();
async function query() {
  const answer = await inquirer.prompt(question);
  console.log('answer', answer);
  //   if (answer.operation === '退出') return;
  //   await require(`../lib/operation/${opt[answer.operation]}`)();
  //   await query();
}
