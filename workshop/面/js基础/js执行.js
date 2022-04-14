setTimeout(function () {
  console.log('setTimeout1');
  Promise.resolve().then(function () {
    console.log('promise1');
    return Promise.resolve().then(function () {
      console.log('promise2');
      return Promise.resolve().then(function () {
        console.log('promise3');
      });
    });
  });
});
setTimeout(function () {
  console.log('setTimeout2');
});

// setTimeout
// promise1
// promise2
// setTimeout2

//
