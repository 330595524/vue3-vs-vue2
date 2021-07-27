<template>
  <div class="msg" ref="msg" :class="{ active: msgStatus }">
    <div class="msg-warpper">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "vue-msg",
  data() {
    return {
      text: "",
      msgStatus: false,
    };
  },
  methods: {
    msgPlugin(msg) {
      this.text = msg;
      this.msgPlugin = true;
      setTimeout(() => {
        this.msgStatus = false;
      });
    },
  },
};
</script>

<style>
.msg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  min-height: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: #fff;
  transition: all 0.5s;
  z-index: -1;
  opacity: 0;
}
.msg.active {
  width: 180px;
  min-height: 30px;
  opacity: 1;
  z-index: 11;
}
</style>
