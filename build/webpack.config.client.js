const path = require('path');
// vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
// 所以要手动在 webpack 配置中加上这个插件
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
// 将非 JS 的文件单独打包分离出来，这里主要是希望单独引入 CSS
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
// windows npm script 设置变量是通过 set NODE_ENV=production
// mac npm script 设置变量是 NODE_ENV=production NODE_ENV=production
// 使用 cross-env 可以统一设置环境变量的方式: cross-env 
const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"',
    },
  }),
  new HtmlPlugin(),
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

let config;

if (isDev) {
  // webpack-merge 不影响 baseConfig，因为产生的是新结果
  config = webpackMerge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'less-loader', // less-loader 会转化 less 为 css，所以还得给 css-loader 处理
          ],
        }
      ],
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]),
  });
} else {
  config = webpackMerge(baseConfig, {
    entry: {
      // 将类库与第三方依赖单独打包成 vendor，因为如果跟业务代码混在一起，那么由于业务经常更新所以导致这些都无法长期缓存
      app: path.join(__dirname, '../client/index.js'),
    },
    output: {
      // chunkhash 与 hash 的区别：
      // chunkhash 如果你的文件不改变（类库），那么下次打包时的哈希值不会变；但是 hash 每次都会变
      // 所以第三方依赖与类库需要使用 chunkhash，否则单独打包就没意义了，也无法做长期缓存
      filename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
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
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[hash:8].css'),
      // 在 webpack3 是 webpack.optimize.CommonsChunkPlugin
      new webpack.optimize.SplitChunksPlugin({
        name: 'runtime',
      }),
    ]),
    optimization: {
      // 在 webpack4 中分离代码要这么写
      splitChunks: {
        cacheGroups: {
          commons: { // 这个键值暂时不知道对打包有什么用
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
  });
}

module.exports = config;
