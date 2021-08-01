<template>
  <div class="hello">
    <input type="text" v-model="tel" />
    <button @click="submit">submit</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      tel: "",
    };
  },
  methods: {
    submit() {
      if (!this.tel) {
        console.log(1111);
      }
    },
  },
};
</script>
