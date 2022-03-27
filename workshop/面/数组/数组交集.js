// 阿里算法题：编写一个函数计算多个数组的交集
// 要求：输出结果中的每个元素一定是唯一的

function intersection(...args) {
  if (args.length === 0) {
    return [];
  }
  if (args.length == 1) {
    return args[0];
  }
  return [
    ...new Set(
      args.reduce((result, arg) => {
        return result.filter((item) => arg.includes(item));
      })
    ),
  ];
}
let kk = intersection([123,1],[1,2],[3,45,1])
console.log(kk);