function findArr(arr, int) {
  let row = arr.length;
  let col = arr[0].length;
  let i = 0;
  let j = col - 1;
  while (i < row && j >= 0) {
    if (arr[i][j] > int) {
      j--;
    } else if (arr[i][j] < int) {
      i++;
    } else {
      return [i, j];
    }
  }
  return false;
}
let arr = [
  [1, 2, 3, 15],
  [4, 5, 10, 16],
  [7, 8, 11, 17],
];
let kk = findArr(arr, 199); // [2, 2]
console.log(kk);
