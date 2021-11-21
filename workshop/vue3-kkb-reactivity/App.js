import { effectWatch, reactive } from './core/reactivity/index.js';
import { h } from './core/reactivity/h.js';
export default {
  render(context) {
    // const div = document.createElement('div');
    // div.innerText = context.state.count;
    // return div;
    return h(
      'div',
      {
        id: 'app-id' + String(context.state.count),
        class: 'showTime',
      },
      // String(context.state.count)
      [h('p', {}, String(context.state.count)), h('p', {}, 'hhcc33333')]
    );
  },
  setup() {
    // a = 数据响应
    const state = reactive({ count: 0 });
    window.state = state;
    return { state };
  },
};

// App.render(App.setup());
