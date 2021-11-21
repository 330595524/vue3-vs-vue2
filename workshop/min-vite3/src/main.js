// 原生的es module
// console.log('main....');
// import {str} from './moduleA.js';
// console.log(str);

import { createApp, h } from 'vue';
const App = {
  render() {
    return h('div', null, [h('div', null, String('123'))]);
  },
};
createApp(App).mount('#app');
