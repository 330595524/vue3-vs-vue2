/*
* compiler
* */

function parse() {
//语义拆分成数字，templateStr 拆分成数组
  const  tokens = tokenizer(templateStr)
  console.log(tokens, '输出数组')
  //  数组变成属性结构，， 递归
    /*
    [
    { type: 'tagstart', val: 'div' },
      { type: 'props', val: 'id="app"' },
      { type: 'tagstart', val: 'p' },
      { type: 'props', val: '@click="add"' },
      { type: 'props', val: ':id="name"' },
      { type: 'text', val: '{{count}}' },
      { type: 'tagend', val: 'p' },
      { type: 'tagstart', val: 'p' },
      { type: 'text', val: '今天天气真不错，心情也很好' },
      { type: 'tagend', val: 'p' },
      { type: 'tagend', val: 'div' }
    ]
    */
  let cur = 0
  let ast = {
    type: 'root',
    props:[],
    children: [] // 子元素
  }

  while (cur < tokens.length) {
    ast.children.push(walk())
  }
  return ast

  function walk() {
   let token = tokens[cur]
    if(token.type === 'tagstart') {
      let node = {
        type: 'element',
        tag:token.val,
        props:[],
        children: []
      }
      token = tokens[++cur]
      //  往下走直到tagend  or  tagstart  之中 都是自己的内容
      while (token.type !== 'tagend') {
        if( token.type == 'props' ) {
          node.props.push(walk())
        } else {
          node.children.push(walk())
        }
        token = tokens[cur]
      }
      cur++
      return  node
    }
    if (token.type === 'tagend') {
      cur++
    }
    if (token.type === 'text') {
      cur++
      return  token
    }
    if (token.type === 'props') {
      cur++
      const [key ,val ] = token.val.split('=')
      return {key,val}
    }
  }
}

function traverse(ast, context) {
  switch(ast.type){
    case "root":
      context.helpers.add('createBlock')
    // log(ast)
    case "element":
      ast.children.forEach(node=>{
        traverse(node,context)
      })
      ast.flag = {props:false,class:false,event:false}
      ast.props = ast.props.map(prop=>{
        const {key,val} = prop
        if(key[0]=='@'){
          ast.flag.event = true
          return {
            key:'on'+key[1].toUpperCase()+key.slice(2),
            val
          }
        }
        if(key[0]==':'){
          ast.flag.props = true
          return{
            key:key.slice(1),
            val
          }
        }
        if(key.startsWith('v-')){
          // pass such as v-model
        }
        return {...prop,static:true}
      })
      break
    case "text":
      // trnsformText
      let re = /\{\{(.*)\}\}/g
      if(re.test(ast.val)){
        //有{{
        ast.static = false
        context.helpers.add('toDisplayString')
        ast.val = ast.val.replace(/\{\{(.*)\}\}/g,function(s0,s1){
          return s1
        })
      }else{
        ast.static = true
      }
  }
 /* switch (ast.type){
    case 'root':
      context.helpers.add('createBlock')
    case 'element':
        // props 在element里面
      // div 或者别的html元素
      // 需要做 1. vue的语法标记出来， 2. class  props event 这几个如果是静态的，我们标记出来，后面方便vdom diff时候略过
      ast.children.forEach(node=>{
        traverse(node,context)
      })
      ast.flag = {props:false,class:false,event:false} // 默认都是静态的
      ast.props = ast.props.map(prop=>{
        const {key,val} = prop
        if(key[0] == '@'){
        //  事件
          ast.flag.event = true; // 后续做节点对比的时候，需要对事件进行diff。先remote，再 addEvenetListioner
          return  {
            key: 'on'+key[1].toUpperCase() + key.slice(2),  // @click => onClick
            val
          }
        }

        if(key[0] === ':'){
        //  动态属性
          ast.flag.props = true
          return  {
            key: key.slice(1),
            val
          }
        }

        if(key.startsWith === 'v-'){
        //  后期可以自行扩展
        }

        return {...prop, static:true}

      })
      break;

    case 'text':
  //    文本，需要判断{{}} 动态的，没有这个就是静态的
      let re = /\{\{(.*)\}\}/g
      if (re.test(ast.val))
      {
        ast.static = false
        context.helpers.add('toDisplayString');
        ast.val = ast.val.replace(re,function (s0,s1) {
          return s1
        })
      }else {
        ast.static = true // 标记为true，后续vue进行dom diff的时候直接略过
      }
  }*/
}

function tokenizer(input) {
  let tokens = [];
  let type = '',val = ''
  for (let i = 0; i < input.length; i++) {
    let ch = input[i]
    if (ch === '<') {
      push() // 以<开头，语义更换 push
      if (input[i+1] === '/') {
        type = 'tagend' // </ 结束元素
      } else {
        type = 'tagstart' // <div 开始元素
      }
    }
    if (ch === '>') {
      push()
      type = 'text'
      continue
    }else if(/[\s]/.test(ch)){
      push()
      type = 'props'
      continue
    }
    val += ch
  }

  return tokens

  function push() {
    if (val) {
      if (type === 'tagstart') val = val.slice(1)
      if (type === 'tagend') val = val.slice(2)
      tokens.push({type,val})
      val = ''
    }
  }

}


function transform(ast) {
  // 给通用ast 加上vue语法标识
  // 包括vue的特定template 语法，包括静态标记
  let context = {
    helpers: new Set(['openBlock','createVnode']) // 用到的工具函数
  }
//  树形结构，递归比较
  traverse(ast, context)
  ast.helpers = context.helpers
}

function generate(ast) {
  const {helpers} = ast;
  let code =
  `import {${[...helpers].map(v =>v + ' as _' + v).join(',')}} from 'vue'\n
  export function render(_ctx, _cache,$props) {
    return (_openBlock(), ${ast.children.map(node=>walk(node))})
  }
  `
  function walk (node){
    switch (node.type){
      case 'element':
        let {flag} =node
        let props = '{'+node.props.reduce((ret,p)=>{
          if(flag.props){
            //属性是动态的
            ret.push(p.key +':_ctx.' + p.val.replace(/['"]/g,'') )
          }else {
            ret.push(p.key+':'+p.val)
          }
          // if(flag.props){
          //   //动态属性
          //   ret.push(p.key +':_ctx.'+p.val.replace(/['"]/g,'') )
          // }else{
          //   ret.push(p.key +':'+p.val )
          // }
          return ret
        },[]).join(',') + '}'
        return  `_cretateVnode("${node.tag}",${props},
          [${node.children.map((n)=>walk(n))}],
          ${JSON.stringify(flag)}
        )`
        break;
      case 'text':
        if(node.static){
          return '"'+node.val + '"'
        }else {
          return  `_toDisplayString(_ctx.${node.val})`
        }
        break;
    }
  }
  return code
}

// super tiny comiler

function comiler(template) {
  let ast = parse(template)
  transform(ast)
  // ll(ast)
  const code = generate(ast)
  console.log(code);
  return code

}

let templateStr = `<div id="app">
      <p @click="add" :id="name">{{name}}</p>
      <h1 class="item">今天天气不错！</h1>
  </div>`

//class、 md 、 unit test

comiler(templateStr)

function ll(data) {
  console.log(JSON.stringify(data,null,2));
}
