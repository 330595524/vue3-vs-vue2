const { prototype } = require('events');
const fetch = require('node-fetch');
const axiosOrg = {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

const axios = new Proxy(axiosOrg, {
  set() {
    throw new Error('can not set any prototype');
  },
  get(target, name) {
    const method = name.toLocaleUpperCase();
    return (url, options) => {
      return fetch(url, {
        method,
        ...options,
      }).then((res) => res.text());
    };
  },
});
