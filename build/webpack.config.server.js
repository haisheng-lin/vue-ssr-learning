const path = require('path');
// vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
// 所以要手动在 webpack 配置中加上这个插件
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// 将非 JS 的文件单独打包分离出来，这里主要是希望单独引入 CSS
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
// windows npm script 设置变量是通过 set NODE_ENV=production
// mac npm script 设置变量是 NODE_ENV=production NODE_ENV=production
// 使用 cross-env 可以统一设置环境变量的方式: cross-env

const VueServerPlugin = require('vue-server-renderer/server-plugin')

const config = webpackMerge(baseConfig, {
  entry: path.join(__dirname, '../client/server-entry.js'),
  target: 'node', // 服务端渲染必须传
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
  },
  // 纯前端渲染就需要把类库连同你的代码一起打包，因为浏览器没有 module 模块
  // 不要打包 vue, vuex, vue-router 到 node
  // 因为如果打包了，就跟 node_modules 里面的依赖有重复，造成打包了两份文件
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      { // 因为 vue-style-loader 是把 CSS 通过 JS 注入到 dom
        // 但是 node 端没有 dom 环境，那么就会报错
        // 所以单独打包出来
        test: /\.less$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'less-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractPlugin('styles.[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
    new VueServerPlugin(),
  ],
});

module.exports = config;
