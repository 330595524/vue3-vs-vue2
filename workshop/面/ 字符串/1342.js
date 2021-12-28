var numberOfSteps = function (num) {
  const binStr = num.toString(2);
  console.log(binStr);
  const arr = binStr.match(/1/g);
  console.log(arr);
  if (arr) {
    return binStr.length + arr.length - 1;
  } else {
    return 0;
  }
};

var numberOfSteps2 = function(num) {
    let sum=0
    while(num!=0){
        if(num%2==0){
            num/=2
        }else{
            num--
        }
        sum++
    }
    return sum
};

let kk = numberOfSteps2(16);
console.log(kk);
