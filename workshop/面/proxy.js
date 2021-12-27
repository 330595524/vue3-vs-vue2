let observeStore = new Map();

function makeObservable(target) {
  let handlerName = Symbol('handle');
  observeStore.set(handlerName, []);
  target.observer = function (handler) {
    observeStore.get(handlerName).push(handler);
  };
  const proxyHandler = {
    get(target, property, reveiver) {
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], proxyHandler);
      }
      let success = Reflect.get(...arguments);
      if (success) {
        observeStore
          .get(handlerName)
          .forEach((handler) => handler('GET', property, target[property]));
      }
      return success;
    },
    set(target, property, value, reveiver) {
      let success = Reflect.set(...arguments);
      if (success) {
        observeStore
          .get(handlerName)
          .forEach((handler) => handler('SET', property, value));
      }
      return success;
    },
    deleteProperty(target, property) {
      let success = Reflect.deleteProperty(...arguments);
      if (success) {
        observeStore
          .get(handlerName)
          .forEach((handler) => handler('DELECT', property, target[property]));
      }
      return success;
    },
  };
  return new Proxy(target, proxyHandler);
}
let user = {};
user = makeObservable(user);
user.observer((action, key, value) => {
  console.log(action, key, value);
});
user.name = '3333';
console.log(user.name);
delete user.name;
