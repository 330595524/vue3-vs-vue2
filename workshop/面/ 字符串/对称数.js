// 打印出 1 - 10000 之间的所有对称数
let bb = [...Array(10000).keys()].filter((x) => {
  return (
    x.toString().length > 1 &&
    x === Number(x.toString().split('').reverse().join(''))
  );
});
console.log([...Array(10000).keys()]);
console.log(bb);
