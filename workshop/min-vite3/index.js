const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');

app.use(async (ctx) => {
  const {
    request: { url, query },
  } = ctx;
  console.log(url, query.type);
  if (url === '/') {
    ctx.type = 'text/html';
    const content = fs.readFileSync('./index.html', 'utf-8');
    ctx.body = content;
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = 'application/javascript';
    const content = fs.readFileSync(p, 'utf-8');
    // ctx.body = content;
    ctx.body = rewriteImport(content);
  } else if (url.startsWith('/@modules/')) {
    // 这是一个node_module里的东⻄
   const prefix = path.resolve(__dirname,'node_modules',url.replace('/@modules/',''))
    const module = require(prefix+'/package.json').module
    const p = path.resolve(prefix,module)
    const ret = fs.readFileSync(p,'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
  }
});

function rewriteImport(content) {
  return content.replace(/from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    // . ../ /开头的，都是相对路径
    if (s1[0] !== '.' && s1[1] !== '/') {
      return `from '/@modules/${s1}'`;
    } else {
      return s0;
    }
  });
}

app.listen(3000, () => {
  console.log('请启动成功  vite  start');
});
