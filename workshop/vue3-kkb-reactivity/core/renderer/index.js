// vue3 - > runtime-core
function createElement(type) {
  return document.createElement(type);
}

function createTextNdoe(text) {
  return document.createTextNode(text);
}

//专门处理props
function patchProps(el,key,preValue,nextValue) {
  if(nextValue === null){
    el.removeAttribute(key)
    return
  }
  el.setAttribute(key,nextValue);
}

function insert(el,parent) {
  parent.append(el);
}





export function mountElement(vnode, container) {
  // 1. type
  const {tag} = vnode;
  const el = (vnode.el = document.createElement(tag));

  const { props } = vnode;

  if (props) {
    for (const key in props) {
      const val = props[key];
      patchProps(el,key,null,val);
    }
  }


  const { children } = vnode;

  if (typeof children === 'string') {
    insert(createTextNdoe(children),el)
  } else if (Array.isArray(children)) {
    //   数组
    children.forEach((v) => mountElement(v, el));
  }

  // 插入
 insert(el,container);
}

// n1 old
// n2 new

export function diff(n1, n2) {
  console.log(n1, n2);
  // 1.tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag));
  } else {
    const el = (n2.el = n1.el);
    // props
    // new {id:xx,class:'xxxvvv'}
    // old {id:xx,class:'xxxvvv'}
    const { props: newProps } = n2;
    const { props: oldProps } = n1;

    if (newProps && oldProps) {
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key];
        const oldVal = oldProps[key];
        if (newVal !== oldVal) {
         patchProps(el,key,oldVal,newVal);
        }
      });
    }

    if (oldProps) {
      // 删掉老的属性
      Object.keys(oldProps).forEach((key) => {
        const oldVal = oldProps[key];
        if (!oldVal) {
          patchProps(el,key,oldVal,null);
        }
      });
    }

    // 2.props
    // 3. children  -> 暴力解法
    //  1.  newchildren -> string  (old-> string, old -> array)
    //  1.  newchildren -> array  (old-> string, old -> array)
    const { children: oldChildren } = n1;
    const { children: newChildren } = n2;

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        el.innerText = '';
        mountElement(n2, el);
      } else if (Array.isArray(oldChildren)) {
        //  new [a,b,c]
        //  old [a,b,c,e]
        const length = Math.min(newChildren.length, oldChildren.length);
        for (let i = 0; i < length; i++) {
          const newVnode = newChildren[i];
          const oldVnode = oldChildren[i];
          console.log(newVnode, oldVnode, ' 走这里了')
          diff( oldVnode,newVnode);
        }

        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            const newVnode = newChildren[i];
            mountElement(newVnode);
          }
        }

        if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            const oldVnode = oldChildren[i];
            oldVnode.el.parent.removeChild(oldVnode.el);
          }
        }
      }
    }
  }
}
