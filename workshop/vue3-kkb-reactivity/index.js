// const { effect, reactive } = require('@vue/reactivity');
import { effectWatch, reactive }   from './core/reactivity/index.js'
// let a = 10;

// let b;
// update();
// function update() {
//   b = a + 10;
//   console.log(b);
// }
// a = 20;
// update();

let a = reactive({
  value: 1,
});

let b;
effectWatch(() => {
  //函數
  b = a.value + 10;

  console.log(b);
});
a.value = 30;
