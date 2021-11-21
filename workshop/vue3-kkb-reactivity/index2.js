// const { effect, reactive } = require('@vue/reactivity');
// import { reactive }   from '@vue/reactivity'
import { effectWatch, reactive } from './core/reactivity/index.js';
// let a = 10;

// let b;
// update();
// function update() {
//   b = a + 10;
//   console.log(b);
// }
// a = 20;
// update();

// let a = reactive({
//   value: 1,
// });
//
// let b;
// effectWatch(() => {
//   //函數
//   b = a.value + 10;
//
//   console.log(b);
// });
// a.value = 30;

const App = {
  render(context) {
    // 构建view = b
    // effectWatch(() => {
      // view 每次都要重新创建
      // 最小更新点 diff

      // document.body.innerText = '';
      const div = document.createElement('div');
      div.innerText = context.state.count;
      return div
      // document.body.append(div);
    // });
  },
  setup() {
    // a = 数据响应
    const state = reactive({ count: 0 });
    window.state = state;
    return { state };
  },
};

App.render(App.setup());
