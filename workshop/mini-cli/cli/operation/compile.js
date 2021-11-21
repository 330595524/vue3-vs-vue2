const fs = require('fs');
const chalk = require('chalk');
const handlebars = require('handlebars');
/**
 * 编译模板文件
 * @param meta 数据定义
 * @param filePath 目标文件路径
 * @param templatePath 模板文件路径 */
function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
    console.log(chalk.green(` ${filePath} 创建成功`));
  }
}
module.exports = compile;
