const { spawn } = require('../api/process');
const fs = require('fs');
const inquirer = require('inquirer');
const compile = require('../api/compile');
const copy = require('../api/copy');
module.exports = async (basePath = './admin') => {
  const choices = fs
    .readdirSync('./admin')
    .filter((v) => !['framework', 'cli', '.git', 'template'].includes(v));
  choices.unshift('主模块');
  const question = [
    {
      type: 'list' /* 选择框 */,
      message: '请选择子项目?',
      name: 'moduleName',
      choices /* 选项*/,
    },
  ];
  const answer = await inquirer.prompt(question); // 修改入口文件
  console.log(`切换为: ${answer.moduleName} `);
  // 生成子模块配置文件
  compile(
    {
      name: answer.moduleName,
    },
    `${basePath}/framework/submodule.js`,
    `${basePath}/framework/template/submodule.js.hbs`
  );
  // Copy路由
  if (answer.moduleName === '主模块') {
    copy(
      `${basePath}/framework/src/router/index_origin.js`,
      `${basePath}/framework/src/router/index.js`
    );
  } else {
    copy(
      `${basePath}/${answer.moduleName}/src/router.js`,
      `${basePath}/framework/src/router/index.js`
    );
  }
  // 启动项目
  await spawn('npm', ['run', 'serve'], { cwd: `${basePath}/framework` });
};
