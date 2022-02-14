for (var i = 1; i <= 9; i++) {
  for (var b = 1, str = ''; b <= i; b++) {
    str += b + 'x' + i + '=' + b * i + ' ';
  }
  console.log(str);
}
