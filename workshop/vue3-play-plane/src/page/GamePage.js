import { defineComponent, h } from '@vue/runtime-core';
// let startPageImg = require('../../assets/5.png');
import mapImg from '../../assets/map.png';

export default defineComponent({
  render() {
    //   背景图片
    return h('Container', [h('Sprite', { texture: mapImg })]);
  },
});
