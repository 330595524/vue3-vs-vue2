var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

var flatArr = arr.flat(4);
console.log(flatArr);
var disArr = Array.from(new Set(flatArr));
console.log(disArr);
let result = disArr.sort((a, b) => {
  return a - b;
});
console.log(result);