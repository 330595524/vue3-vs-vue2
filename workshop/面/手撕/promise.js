const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};
function test() {
  let promise = Promise.resolve();
  list.forEach((x) => {
    promise = promise.then(() => square(x)).then(console.log);
  });
}
test();

async function test() {
    for(let i = 0; i<list.length; i++) {
        const res = await square(list[i])
    	console.log(res)
    }
}
test()
