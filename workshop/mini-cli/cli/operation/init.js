 
const { promisify } = require("util");
const download = promisify(require("git-pull-or-clone")); const ora = require("ora");
const { resolve } = require("path");
const { spawn } = require("../api/process");
const chalk = require("chalk");
const log = (...args) => console.log(chalk.green(...args)); module.exports = async () => {
console.log("path", resolve("."));
// 项目名称
const name = "admin";
const repo = "git@gitee.com:josephxia/element3-admin-framework.git";
// const repo = 'https://gitee.com/josephxia/element3-admin-framework.git'
 const desc = resolve(`./${name}`);

console.log("desc", desc);
const process = ora(`   下载.....${repo}`); process.start();
try {
    await download(repo, desc);
process.succeed(); } catch (e) {
console.log(e);
process.fail(); }
// 安装依赖
log("安装依赖");
// 安装Framework依赖
await spawn("npm", ["install"], { cwd: `${desc}/framework/` });
log(` 安装完成:
To get Start: ===========================
    cd ${name}/framework
npm run serve ===========================
 };