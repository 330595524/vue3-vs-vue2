
// 1. 找到一个入口文件
// 2. 解析这个入口文件，提取她的依赖
// 3. 解析入口文件的依赖，递归去创建一个文件间的依赖图，描述所有文件的依赖关系
// 4. 把所有文件打包成一个文件
 
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const { relative } = require('path');
const babel = require('babel-core');
let ID = 0;

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8')
    const ast = babylon.parse(content,{
        sourceType: 'module'
    })
    const dependencies = []
    traverse(ast,{
        ImportDeclaration:({node})=>{
            dependencies.push( node.source.value)
        }
    })
    //提取entry 她的依赖 

    const id = ID++;
    const {code} = babel.transformFromAst(ast,null,{
        presets:['env']
    })

    return {
        id,
        filename,
        dependencies,
        code
    }
}

function createGraph(entry) {

   const mainAsset = createAsset(entry)
   const allAsset = [mainAsset]
   for (const asset of allAsset) {
       const dirname = path.dirname(asset.filename);
       asset.mapping = {};
       asset.dependencies.forEach(relativePath=>{
           const absolutePath = path.join(dirname, relativePath);
           const childAsset = createAsset(absolutePath);
            asset.mapping[relativePath] = childAsset.id;
            allAsset.push(childAsset)
       })
   } 
//    遍历所有文件 通过遍历过程中添加allAsset 的值,输出依赖图
   
   return allAsset 

}

function bundle(graph) {
    let modules = '';

    graph.forEach(module => {
        modules +=`${module.id}:[
            function(require, module, exports){
                ${module.code}
            },
            ${JSON.stringify(module.mapping)},
        ],`
    })

    // 自执行函数
    const result = `
        (function (modules) {
            function require (id){
                const [fn,mapping] = modules[id];
                function localRequire(relativePath){
                    return require(mapping[relativePath])
                }
                const module = {exports:{}}
                fn(localRequire,module, module.exports);
                return module.exports;

            }
            require(0)
        })({${modules}})
    `
    return result
}

const mainAsset = createGraph('./source/entry.js')
const result  = bundle(mainAsset)
console.log(result);