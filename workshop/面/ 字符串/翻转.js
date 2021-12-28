function reverse(n) {
  let y = n % 10;
  console.log(y);
  let s = String(y);
  if (n / 10 >= 1) {
    s += reverse((n - y) / 10);
  }
  return s;
}
let kk = kkk(1234);
console.log(kk);

function kkk(n) {
    let y = n % 10 ;
    let s = String(y)
    if (n/10 >= 1 ) {
        s += kkk((n-y)/10)
    }
    return s
    
}
