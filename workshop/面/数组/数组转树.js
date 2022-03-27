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
console.log(toTree(oldData));
