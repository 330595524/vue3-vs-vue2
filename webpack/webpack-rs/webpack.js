const fs = require('fs');
const path = require('path');
const parser =require('@babel/parser');
// 节点遍历
const traverse =require('@babel/traverse').default;;
// es6 -> es
const babel = require('@babel/core');

/**
 * 分析依赖
 * file
 */
function getModuleInfo(file) {
    const body = fs.readFileSync(file, 'utf-8');
    //  转换ast语法树
    // console.log(body);
    const ast = parser.parse(body,{
        sourceType: 'module'
    })

    // 依赖收集 import xxx
    const deps = {}

    traverse(ast,{
        // visitor
        ImportDeclaration({node}){
            const dirname = path.dirname(file)
            const absinth = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = absinth
        }
    })

    console.log(deps,'000000');
    // es6=>es5
    const { code }= babel.transformFromAst(ast,null,{
        // 预设
       presets:['@babel/preset-env'] 
    })

    const info = {
        file,
        code,
        deps
    }
    return info
}


// const info = getModuleInfo('./src/index.js')
// console.log(info);

function parseModules(file) {
    const entry = getModuleInfo(file) // 所有模块的依赖信息
    const temp = [entry]
    const depsGraph = {}
    getDeps(temp, entry)

    // 数组转对象
    temp.forEach(info=>{
        depsGraph[info.file] = {
            deps:info.deps,
            code: info.code
        }
    })
    return depsGraph
}
/**
 *  给递归使用，获取依赖
 * @param {*} temp  临时模块
 * @param {*} param1  上一个模块的依赖关系  info
 */
function getDeps(temp,{deps}) {
    Object.keys(deps).forEach(key=>{
        const child = getModuleInfo(deps[key])
        temp.push(child)
        getDeps(temp, child)
    })
}


// const content = parseModules('./src/index.js')
// console.log('constent',content);

function bundle(file) {
    const depsGraph = JSON.stringify(parseModules(file))
    return `
    (function (graph) {
        function require(file) {
         function absRequire(relPath) {
             return require(graph[file].deps[relPath])
         }
         var exports = {};
         (function (require,exports,code) {
             eval(code)
         })(absRequire, exports, graph[file].code)
          return exports;
        }
        require('${file}');
      })(${depsGraph});
    `
    
}

const content  = bundle('./src/index.js')
!fs.existsSync('./dist') && fs.mkdirSync('dist')
fs.writeFileSync('./dist/bundle.js', content)

