var allArray = function (nums) {
  var res = [];
  var dfs = function (path) {
    console.log(path, '初始');
    if (nums.length === path.length) {
      //(1)
      console.log(path.length, 'length');
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      console.log(
        path,
        nums[i],
        path.indexOf(nums[i]) !== -1,
        'for===============>>>>>'
      );
      if (path.indexOf(nums[i]) !== -1) {
        //(2)
        continue;
      }

      path.push(nums[i]); //(3)
      console.log(path, nums[i], 'path.push');
      dfs(path);
      console.log(path, nums[i], 'path---递归');
      path.pop();
    }
  };
  dfs([]);
  return res;
};

console.log(allArray([1, 2, 3]));
