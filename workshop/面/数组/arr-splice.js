Array.prototype._splice = function(start, deleteCount) {
    // 入参元素个数
    let argumentsLen = arguments.length
    // 数组
    let array = Object(this)
    // 数组长度
    let len = array.length
    // 添加元素个数
    let addCount = argumentsLen > 2 ? argumentsLen -2 : 0
    // 计算有效的 start
    let startIndex = computeSpliceStartIndex(start, array)
    // 计算有效的 deleteCount
    let delCount = computeSpliceDeleteCount(startIndex, deleteCount, len)
    // 记录删除的数组元素
    let deletedElements = new Array(delCount)
    
    // 将待删除元素记录到 deletedArray
    recordDeleteElements(startIndex, delCount, array, deletedElements)
    
    // 移动数组元素
    moveElements(startIndex, delCount, array, addCount)
    
    let i = startIndex
    let argumentsIndex = 2
    
    // 插入新元素
    while (argumentsIndex < argumentsLen) {
        array[i++] = arguments[argumentsIndex++]
    }
    
    array.length = len - delCount + addCount

    // 返回删除元素数组
    return deletedElements;
}

// 计算真实的 start
function computeSpliceStartIndex(start, len) {
    // 处理负值，如果负数的绝对值大于数组的长度，则表示开始位置为第0位
    if(start < 0) {
        start += len
        return start < 0 ? 0 : start
    }
    // 处理超出边界问题
    return start > len - 1 ? len - 1: start
} 

// 计算真实的 deleteCount
function computeSpliceDeleteCount(startIndex, deleteCount, len) {
    // 超出边界问题
    if(deleteCount > len - startIndex) deleteCount = len - startIndex
    // 负值问题
    if(deleteCount < 0) deleteCount = 0
    return deleteCount
}

// 记录删除元素，用于 Array.prototype.splice() 返回
function recordDeleteElements(startIndex, delCount, array, deletedElementd) {
    for(let i = 0; i < delCount; i++) {
        deletedElementd[i] = array[startIndex + i]
    }
}

// 移动数组元素，便于插入新元素
function moveElements(startIndex, delCount, array, addCount) {
    let over = addCount - delCount
    if(over) {
        // 向后移
        for(let i = array.length - 1; i >= startIndex + delCount; i--) {
            array[i+over] = array[i]
        }
    } else if (over < 0) {
        // 向前移
        for(let i = startIndex + delCount; i <= array.length - 1; i++) {
            if(i + Math.abs(over) > array.length - 1) {
                // 删除冗于元素
                delete array[i]
                continue
            }
            array[i] = array[i + Math.abs(over)]
        }
    }
}

let months = ['Jan', 'March', 'April', 'June']
console.log(months._splice(1, 1, 'Feb'))
// ["March"]
console.log(months)
// ["Jan", "Feb", "April", "June"]