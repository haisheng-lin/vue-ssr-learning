const path = require('path');
// vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
// 所以要手动在 webpack 配置中加上这个插件
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
// 将非 JS 的文件单独打包分离出来，这里主要是希望单独引入 CSS
const baseConfig = require('./webpack.config.base');
// windows npm script 设置变量是通过 set NODE_ENV=production
// mac npm script 设置变量是 NODE_ENV=production NODE_ENV=production
// 使用 cross-env 可以统一设置环境变量的方式: cross-env

// 在 SSR 中 plugins 的配置不一样，所以不在 base 里面写
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
    },
  }),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html'),
  }),
];

const devServer = { // 支持热更新
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true, // 只重加载改动的组件
  // open: true, // 每次都会自动打开页面
};

const config = webpackMerge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path]-[name]-[hash:base64:5]', // 把 css class 名字按规则命名
                  camelCase: true, // 把 css 命名转换成驼峰
                },
              },
              'less-loader',
            ],
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [
              'vue-style-loader', // 开发环境使用 vue-style-loader 允许 CSS 热重载，普通的 style-loader 做不到
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                },
              },
              'less-loader', // less-loader 会转化 less 为 css，所以还得给 css-loader 处理
            ],
          },
        ],
      },
    ],
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),
});

module.exports = config;
