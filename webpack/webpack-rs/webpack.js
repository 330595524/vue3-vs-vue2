const fs = require('fs');
const path = require('path');
const parser =require('@babel/parser');
// 节点遍历
const traverse =require('@babel/traverse');
// es6 -> es
const babel = require('@babel/core');
/**
 * 分析依赖
 * file
 */
function getModuleInfo(file) {
    const body = fs.readFileSync(file, 'utf-8');
    //  转换ast语法树
    console.log(body);
    const ast = parser.parse(body,{
        sourceType: 'module'
    })

    // 依赖收集 import xxx
    const deps = {}
    traverse(ast,{
        // visitor
        ImportDeclaration({node}){

        }
    })
}
getModuleInfo('. /')