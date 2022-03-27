const fs = require('fs');
function promisify(fn) {
  return function (...args) {
    console.log(args);
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

      fn.apply(null, args);
    });
  };
}

// 使用promisify后
const readFile = promisify(fs.readFile);
readFile('./proxy.html')
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log('error:', err);
  });
