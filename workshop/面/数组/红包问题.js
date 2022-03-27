function redpackage() {
  let num = 100;
  let all = 10;
  let money;
  for (let i = 0; i < all; i++) {
    if (i == 9) {
      money = num.toFixed(2);
    } else {
      money = (Math.random() * num).toFixed(2);
    }
    if (money < 0.01) {
      money = 0.01;
    }
    num = num - money;
    console.log(num, i, money);
  }
}
redpackage();
