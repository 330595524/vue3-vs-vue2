import {effectWatch} from "./index.js";
import {diff, mountElement} from "../renderer/index.js";

/**
 * Created: xulimin
 * Date: 2021-10-26
 */
export function createApp(rootComponent) {
  let prevSubTree ;
  let isMounted = false;

  return {
    mount(rootContainer) {
      const context = rootComponent.setup();


      effectWatch(() => {
        if (!isMounted) {
          rootContainer.innerHTML = ``;
          isMounted = true;
          // const element = rootComponent.render(context);
          // rootContainer.append(element);

          const subTree = rootComponent.render(context);
          console.log(subTree, 'subTree');
          mountElement(subTree, rootContainer);
          prevSubTree = subTree;
          console.log(subTree,prevSubTree,'34');
        } else {
          // update
          const subTree = rootComponent.render(context);
          console.log(prevSubTree,subTree,'34222');
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
