let kk = strfn('abcfafdeb');
console.log(kk, 'kk');
function strfn2(s) {
  let arr = [],
    max = 0;
  for (let i = 0; i < s.length; i++) {
    let index = arr.indexOf(s[i]);
    if (index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i));
    max = Math.max(arr.length, max);
  }
  return arr.join('');
}

function strfn(s) {
  let l = 0; //子串左边界位置
  let res = 0; //最长连续无重复子串长
  let str = '';
  const map = new Map();
  for (let r = 0; r < s.length; r++) {
    //该字符存在map中并且在字串中 注意 abbcdea 这种情况
    if (map.has(s[r]) && map.get(s[r]) >= l) {
      l = map.get(s[r]) + 1; //移动左边界至重复字符的下一个位置
    }
    res = Math.max(res, r - l + 1); //更新最长子串
    map.set(s[r], r); //将该字符放入map
  }
  str = s.substr(l, res);
  return str;
}

function stsring(s) {
  let left = 0,
    right = 1,
    str;
  while (right < s.length) {
    str = s.slice(left, right);
    if (str.indexOf(s.charAt(right)) > -1) {
      left++;
      continue;
    } else {
      right++;
    }
  }
  return str;
}
