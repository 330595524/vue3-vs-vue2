const obj = {
  count: 0,
  [Symbol.iterator]: () => {
    // 迭代器
    return {
      next: () => {
        obj.count++;
        if (obj.count <= 10) {
          return {
            value: obj.count,
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

for (const item of obj) {
  console.log(item);
}

//  JSON.stringify 会忽略Symbol, undefined  function  
// 如果对象有循环引用，可以用JSON.stringify来处理么？
// 会报错
//  确定是 stringify 报错，而不是 parse 会报错
// stringify  有循环引用会导致栈溢出
