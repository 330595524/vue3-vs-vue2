function add() {
    const args = Array.prototype.slice.apply(arguments);
    const self = this;
    this.nums = [...args];
    function _add() {
      const _args = Array.prototype.slice.apply(arguments);
      this.nums.push(..._args);
      return _add; 
    }
    _add.value = function() {
      return self.nums.reduce((acc, cur) => acc += cur, 0);
    }
    return _add;
  }
  console.log(add(1)(2,3)(4).value() );