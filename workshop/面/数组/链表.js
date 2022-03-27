// 判断链表中是否存在某节点
function List() {
  // 节点
  let Node = function (element) {
    this.element = element;
    this.next = null;
  };
  // 初始头节点为 null
  let head = null;

  // 链表长度
  let length = 0;
  // 操作
  this.getList = function () {
    return head;
  };
  this.search = function (element) {
    let p = head;
    if (!p) {
      return false;
    }
    while (p) {
      if (p.element === element) return true;
      p = p.next;
    }
    return false;
  };

  this.append = function (element) {
    let node = new Node(element),
      p = head;
    if (!head) {
      head = node;
    } else {
      while (p.next) {
        p = p.next;
      }
      p.next = node;
    }
    length += 1;
  };
  this.insert = function (position, element) {};
  this.remove = function (element) {
    let p = head,
      prev = head;
    if (!head) return;
    while (p) {
      if (p.element === element) {
        p = p.next;
        prev.next = p;
      } else {
        prev = p;
        p = p.next;
      }
    }
  };
  this.isEmpty = function () {};
  this.size = function () {};
}
function search(element) {
  let p = head;
  if (!p) {
    return false;
  }
  while (p) {
    if (p.element === element) return true;
    p = p.next;
  }
  return false;
}

// 测试
let list = new List();
// 测试
for (let i = 0; i < 5; i += 1) {
  list.append(i);
}
// 测试
let n1 = list.search(4); // true
let n2 = list.search(11); // false
console.log(n1, n2);
