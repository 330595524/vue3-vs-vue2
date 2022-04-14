// 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

const flatMap = (array) => array.flat(Infinity);
console.log();
let ab = flatMap(arr);
// const unique = (array) => Array.from(new Set(array));
const unique = (array) => Array.from(new Set(array));
console.log(unique(ab));
const sortArr = (array) => array.sort((a, b) => a - b);
var compose =
  (...fns) =>
  (initValue) =>
    fns.reduceRight((y, fn) => fn(y), initValue);
let kk = compose(sortArr, unique, flatMap);
console.log(kk(arr));
// const getArray = (arr, dep) => Array.from(new Set(arr.flat(dep))).sort();
// console.log(getArray(arr, Infinity));
