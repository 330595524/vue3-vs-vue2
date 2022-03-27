import { defineComponent, h } from '@vue/runtime-core';
// let startPageImg = require('../../assets/5.png');
import startPageImg from '../../assets/5.png';
import startBtn from '../../assets/4.png';

export default defineComponent({
  setup(props, ctx) {
    //   vue3的入口函数

    const onClick = () => {
      console.log('dianji le ');
      ctx.emit('changePage', 'GamePage');
    };
    return {
      onClick,
    };
  },
  render(ctx) {
    //   背景图片
    return h('Container', [
      h('Sprite', { texture: startPageImg }),
      h('Sprite', {
        texture: startBtn,
        x: 215,
        y: 530,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});
