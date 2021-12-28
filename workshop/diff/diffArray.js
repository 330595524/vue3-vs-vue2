// old abcdefg
// new abedchfg
// c1,c2 数组，react中是链表
exports.diffArray = (c1, c2, { mountElement, path, unmount, move }) => {
  function isSameVnodeType(n1, n2) {
    return n1.key === n2.key && n1.type === n2.type;
  }
  //   从左边按序查找，如果不匹配就停止
  //   mountElement,新增 path,更新 unmount,删除 move移动
  let i = 0;
  const l1 = c1.length;
  const l2 = c2.length;

  let e1 = l1 - 1;
  let e2 = l2 - 1;
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = c2[i];
    if (isSameVnodeType(n1, n2)) {
      path(n1, key);
    } else {
      break;
    }
    i++;
  }
  //   从右边查找，
  // react可以在右边按序查找么？  不可以  ，  c1 是单链表， 链表最后一个不好找，倒数第二个
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = c2[i];
    if (isSameVnodeType(n1, n2)) {
      path(n1, key);
    } else {
      break;
    }
    e1--;
    e2--;
  }
  // 老节点么了
  if (i > e1) {
    if (i <= e2) {
      while (i < e2) {
        const n2 = c2[i];
        mountElement(n2.key);
        i++;
      }
    }
  }
  //   4. 新节点没了，老节点有
  else if (i > e2) {
    while (i <= e1) {
      const n1 = c1[i];
      unmount(n1.key);
      i++;
    }
  } else {
    //   新老节点都还有，并且还是乱序
    // 把新的vdom做成Map key：index vue中是数组，react中是把老节点 key  vnode 因为是链表
    // 老的vdom 开始位置
    const s1 = i;
    // 新的vdom的起始位置
    const s2 = i;
    const keyToNewIndexMap = new Map();
    for (let i = s2; i < e2; i++) {
      const nextChild = c2[i];
      keyToNewIndexMap.set(nextChild.key, i);
    }
    //5.2 遍历老元素，去map中根据key找节点，找到就证明节点可以服用patch  否则

    const toBePatched = e2 - s2 + 1;
    // 下边是新元素的相对下标，value是老元素的下标 + 1
    const newIndexToOldIndexMap = new Array(toBePatched);
    let mouved = false;
    let maxNexIndexSoFar = 0;

    for (i = 0; i < toBePatched; i++) {
      const element = array[index];
    }

    // 遍历老元素
    for (let i = s1; i < e1; i++) {
      const prevChild = c1[i];
      let newIndex = keyToNewIndexMap.get(prevChild.key);
      if (newIndex === undefined) {
        unmount(prevChild.key);
      } else {
        // 找到可复用节点
        newIndexToOldIndexMap[newIndex - s2] = i + 1;

        if (newIndex >= maxNexIndexSoFar) {
          maxNexIndexSoFar = newIndex;
        } else {
          // 相对位置发生变化
          moved = true;
        }

        patch(prevChild.key);
      }
    }
    //5.3 遍历新元素 mount 、move
    // 新元素在老元素中没有出现过 mount
    //  出现过 move
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : [];

    let lastIndex = increasingNewIndexSequence.length - 1;
    for (i = toBePatched; i >= 0; i--) {
      const nextIndex = s2 + i;
      const nextChild = c2[nextIndex];
      // 判断mount、move
      if (newIndexToOldIndexMap[i] === 0) {
        //   这个节点不能patch ， 那就是mount
        mountElement(nextChild.key);
      } else if (moved) {
        //   如果当前节点在最长递增子序列中，就不需要移动，否则move
        if (lastIndex < 0 || i != increasingNewIndexSequence[lastIndex]) {
          move(nextChild.key);
        } else {
          lastIndex--;
        }
      }

      //   最长递增子序列
      // a b  [c d e] f g
      // a b  [e c d h] f g
      //   下标是新元素的相对下标，value是老元素的下标 + 1
      //    [5 3 4 0]   这样就可以将老节点的最稳定的，确定新增时候最小移动
    }
  }

  //   leetcode  vue中的最长递增子序列需要记录路径
  function getSequence(arr) {
    // return [1, 2];
    // 初始值是arr。p[i] 记录第i个位置的索引
    // 为什么会用到，怎么用的
    const recordIndexOfI = arr.slice();
    const result = [0];
    const len = arr.length;

    let resultLastIndex, resultLast;
    for (let i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        // result 最后一个元素
        resultLastIndex = result.length - 1;
        resultLast = result[resultLastIndex];
        // 当前添加进入的最小的，默认从0开始
        //  如果前边的元素小于后面元素，构成最长递增子序列
        if (arr[resultLast] < arrI) {
          recordIndexOfI[i] = resultLast;
          result.push(i);
          continue;
        }
        let left = 0,
          right = resultLastIndex;
        while (left < right) {
          const mid = (left + right) >> 1;
          if (arr[result[mid]] < arrI) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }

        if (arrI < arr[result[left]]) {
          if (left > 0) {
            recordIndexOfI[i] = result[left - 1];
          }
          result[left] = i;
        }
      }
    }

    // recordIndexOfI 记录了正确的索引 result 进而找到了最终正确的索引
    resultLastIndex = result.length - 1;
    resultLast = result[resultLastIndex];
    while (resultLastIndex >= 0) {
      result[resultLastIndex] = resultLast;
      resultLast = recordIndexOfI[resultLast];
      resultLastIndex--;
    }
    return result;
  }
};
