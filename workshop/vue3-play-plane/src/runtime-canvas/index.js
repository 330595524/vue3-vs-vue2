import { createRenderer } from '@vue/runtime-core';
import { Container, Graphics, Text, Sprite, Texture } from 'pixi.js';
const renderer = createRenderer({
  createElement(type) {
    console.log(type);
    let element;
    switch (type) {
      case 'Container':
        element = new Container();
        break;
      case 'Sprite':
        element = new Sprite();
        break;
      default:
        break;
    }
    // if (type === 'rect') {
    //   element = new Graphics();
    //   element.beginFill(0xff0000);
    //   element.drawRect(0, 0, 500, 500);
    //   element.endFill();
    // } else if (type === 'circle') {
    //   element = new Graphics();
    //   element.beginFill(0xffff00);
    //   element.drawCircle(0, 0, 50);
    //   element.endFill();
    // }

    return element;
  },
  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },
  createText(text) {
    return new Text(text);
  },
  patchProp(el, key, prevValue, nextValue) {
    //   el.x = value
    //   el.y = value

    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue);
        break;
      case 'onClick':
        el.on('pointertap', nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },
  insert(el, parent) {
    console.log(el, '111');
    console.log(parent, '222');
    parent.addChild(el);
  },
  parentNode(node) {
    return node.parent;
  },
  nextSibling() {},
  remove(el) {
    if (el.parent) {
      // eslint-disable-next-line no-debugger
      el.parent.removeChild(el);
    }
  },
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
