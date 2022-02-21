/** @file vue.config.js */

const useCDNs = require("./useCDNs");

module.exports = {
  chainWebpack: (config) => {
    useCDNs(config, [
      {
        mod: "vue",
        refer: "Vue",
        el: `<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>`,
      },
      {
        mod: "moment",
        refer: "moment",
        el: `<script src="https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js" crossorigin="anonymous"></script>`,
      },
    ]);
  },
};
