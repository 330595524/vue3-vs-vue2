<template>
  <div>
    <h1>1231----222</h1>
    <button @click="add">btn</button>
    <span>{{ count }}</span>
    <span>-----{{ num }}</span>
    <p>unwrapped-----{{ unwrapped }}</p>
    <input type="text" v-model="count" />
  </div>
</template>
<script>
import {
  reactive,
  toRefs,
  unref,
  ref,
  defineComponent,
  watch,
  watchEffect,
} from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      count: 0,
    });
    const num = ref(0);
    const add = function () {
      state.count++;
      num.value++;
      console.log(state.count);
    };

    // unwrapped 现在一定是数字类型
    watch(
      () => state.count,
      (count, prevCount) => {
        /* ... */
        console.log(count, prevCount, "2222");
      }
    );
    watchEffect(() => console.log(num.value, "33333"));
    return {
      ...toRefs(state),
      // ...state,
      add,
      num,
    };
  },
  add() {},
});
</script>
