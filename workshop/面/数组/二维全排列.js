let arr = [
  ['A', 'B'],
  ['a', 'b'],
  [1, 2],
];

function reduceFn(arrA, arrB) {
  if (!Array.isArray(arrA) || !Array.isArray(arrB)) {
    return;
  }
  if (arrA.length == 0) {
    return arrB;
  }
  if (arrB.length === 0) {
    return arrA;
  }
  let result = [];

  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrB.length; j++) {
      result.push(arrA[i] + arrB[j]);
    }
  }
  return result;
}

let result = arr.reduce((total, current) => {
  return reduceFn(total, current);
}, []);

console.log(result);
