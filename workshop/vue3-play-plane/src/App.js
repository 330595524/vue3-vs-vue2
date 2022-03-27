// 根组件
import { ref, computed, defineComponent, h } from '@vue/runtime-core';
// import Circle from './component/Circle';
import StartPage from './page/StartPage';
import GamePage from './page/GamePage';

export default defineComponent({
  setup(props, ctx) {
    // 响应式对象

    // 改变string ，切换组件,
    // 计算属性
    const currentPageName = ref('StartPage');

    console.log(currentPageName);
    const currentPage = computed(() => {
      if (currentPageName.value === 'StartPage') {
        return StartPage;
      }
      if (currentPageName.value === 'GamePage') {
        return GamePage;
      }
    });

    return {
      currentPage,
      currentPageName,
    };
  },
  render(ctx) {
    // return (<react x={100}  y={100}></react>)
    // return h(
    //   'rect',
    //   {
    //     x: 100,
    //     y: 100,
    //   },
    //   [
    //     '这个怎的可以渲染',

    //     //  h('circle', { x: 150, y: 150 })
    //     h(Circle),
    //   ]
    // );

    return h('Container', [
      h(ctx.currentPage, {
        onChangePage(page) {
          ctx.currentPageName = page;
          console.log(page, '000');
        },
      }),
      // h(StartPage),
      // h(GamePage),
    ]);
  },
});
