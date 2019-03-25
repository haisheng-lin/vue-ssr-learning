/**
 * @param {boolean} isDev 是否在开发环境
 * @returns {object}
 */
module.exports = (isDev) => {
  return {
    // 如果我们在 vue 模板中不小心多加了空格，可能对渲染出来的模板有影响
    preserveWhitespace: true,
     // vue 默认情况下不会将 vue 文件中的样式部分单独打包出来
     // extract-text-webpack-plugin 不会对 vue 文件的样式部分起作用
     // 所以在这里有这个选项，允许我们把 vue 文件的样式部分单独打包
     // 那么在这我们决定：只在生产环境把 vue 中的样式提取出来，在开发环境不能，因为 webpack-dev-server 不允许设置
    extractCSS: !isDev,
    cssModules: {

    },
    // 根据环境变量生成
    // hotReload: isDev,
    // https://vue-loader.vuejs.org/zh/spec.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9D%97
    // 如果在 vue 文件中声明了一个标签时，那么将会使用以下配置对应的方法去解析它
    // loaders: {
    //   'docs': require.resolve('./doc-loader');,
    // },
  };
};
