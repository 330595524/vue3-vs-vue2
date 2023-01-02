const oldData = [
  { id: 1, name: 'boss', parentId: 5 },

  { id: 2, name: 'lily', parentId: 1 },

  { id: 3, name: 'jack', parentId: 1 },

  { id: 4, name: 'john', parentId: 5 },

  { id: 5, name: 'boss2', parentId: null },
];

let toTree = (arr, id = null, link = 'parentId') =>
  arr
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: toTree(arr, item.id) }));
console.log(JSON.stringify(toTree(oldData), null, 2));

// 树转数组
function treeToArr(data) {
  const result = [];
  data.forEach((item) => {
    const loop = (data) => {
      result.push({
        id: data.id,
        name: data.name,
        parentId: data.parentId,
      });
      let child = data.children;
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i]);
        }
      }
    };
    loop(item);
  });
  return result;
}

let a1 = [];
let a = treeToArr(toTree(oldData));
console.log('================>>>>>>>>.');
console.log(JSON.stringify(a, null, 2));
