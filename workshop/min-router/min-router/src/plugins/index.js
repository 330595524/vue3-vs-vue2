const path = require("path");

console.log(require);

const requireComponment = require("./", true, "/.vue$/");

console.log(requireComponment, "requireComponment");
const install = (Vue) => {
  if (install.installed) return;
  install.installed;
  requireComponment.keys().forEach((fileName) => {
    const config = requireComponment(fileName);
    console.log(config);
    const componmentName = config.default || config;
    console.log(componmentName);
    Vue.component(componmentName, config.default || config);
  });

  Vue.directive("focus", {
    installed: function (el) {
      el.focus();
    },
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
