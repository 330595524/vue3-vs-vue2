/*
* compiler
* */

function parse() {
//语义拆分成数字，templateStr 拆分成数组
  const  tokens = tokenizer(templateStr)
  console.log(tokens, '输出数组')
  //  数组变成属性结构，， 递归

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
        if( token.type === 'props' ) {
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



function traverse() {

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


function transform(input) {

}

function generate() {

}

// super tiny comiler

function comiler(template) {
  let ast = parse(template)
  console.log(JSON.stringify(ast,null ,2));
  // transform(ast)
  // const code = generate(ast)
  // return code

}

let templateStr = `<div id="app">
      <p @click="add" :id="name">{{count}}</p>
      <p>今天天气真不错，心情也很好</p>
</div>`

//class、 md 、 unit test

comiler(templateStr)
