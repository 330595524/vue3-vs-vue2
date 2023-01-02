function compose(middleware) {
  return async function () {
    let args = arguments;
    await dispatch(0);
    async function dispatch(i) {
      const fn = middleware[i];
      if (!fn) return null;
      await fn(...args, async function next() {
        await dispatch(i + 1);
      });
    }
  };
}

//demo
let middleware = [];
middleware.push(async (next) => {
  console.log(0);
  await next();
  console.log(3);
});
middleware.push(async (next) => {
  console.log(1);
  // await sleep(2000)
  await next();
  console.log(1.1);
});
middleware.push(() => {
  console.log(2);
});

const func = compose(middleware);
func();
