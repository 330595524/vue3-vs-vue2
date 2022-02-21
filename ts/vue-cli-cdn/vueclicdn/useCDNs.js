/**
 * Created: xulimin
 * Date: 2022-02-21
 */
/** @file useCDNs.js */

/** @typedef {string} ModuleName 模块名   */
/** @typedef {string} ModuleRefer 模块在全局的引用   */
/** @typedef {string} ElementTem 元素模板   */
/** @typedef {{mod:ModuleName;refer:ModuleRefer;el:ElementTem}} CDNItem  cdn 项目 */

/**
 * cdn 使用函数。
 *
 * 此函数可以在指定开发环境中，指定某些模块作为外部依赖出现，并把准备好的第三方 cdn 模板以 `cdns` 参数通过 HtmlWebpackPlugin 插件插入到 `public/index.html` 文件中。
 * 你可以在 `public/index.html` 中使用 ejs 语法 <%= htmlWebpackPlugin.options.cdns %> 来插入准备好的 cdn。
 *
 * @param {import('webpack-chain')} config webpack-chain 实例
 * @param {CDNItem[]} cdns 传入需要使用的 cdn 数组
 * @param {string} env 什么环境下使用 cdn ，默认生产环境
 */
module.exports = function useCDNs(config, cdns = [], env = "production") {
  if (process.env.NODE_ENV !== env) return;

  config.externals(
    cdns.reduce((prev, v) => {
      prev[v.mod] = v.refer;
      return prev;
    }, {})
  );

  config.plugin("html").tap((args) => {
    args[0].cdns = cdns.map((v) => v.el).join("");
    return args;
  });
};
