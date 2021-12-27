let middleware = [];
middleware.push((next) => {
  console.log(1);
  next();
  console.log(1.1);
});
middleware.push((next) => {
  console.log(2);
  next();
  console.log(2.1);
});
middleware.push((next) => {
  console.log(3);
  next();
  console.log(3.1);
});
let fn = compose(middleware);
fn();
//  洋葱模型

function compose(middlewares) {
  const copyMiddlewares = [...middleware];
  let index = 0;
  const fn = () => {
    if (index >= copyMiddlewares.length) {
      return;
    }
    const middlewware = copyMiddlewares[index];
    index++;
    return middlewware(fn);
  };
  return fn;
}

// 1
// 2
// 3
// 3.1
// 2.1
// 1.1