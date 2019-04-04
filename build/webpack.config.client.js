const path = require('path');
// vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
// 所以要手动在 webpack 配置中加上这个插件
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
// 将非 JS 的文件单独打包分离出来，这里主要是希望单独引入 CSS
// const ExtractPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base');

const VueClientPlugin = require('vue-server-renderer/client-plugin');
// windows npm script 设置变量是通过 set NODE_ENV=production
// mac npm script 设置变量是 NODE_ENV=production NODE_ENV=production
// 使用 cross-env 可以统一设置环境变量的方式: cross-env
const isDev = process.env.NODE_ENV === 'development';

// 在 SSR 中 plugins 的配置不一样，所以不在 base 里面写
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"',
    },
  }),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin(),
];

const devServer = { // 支持热更新
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  // 前端路由使用了 history 模式的话，如果用户手动刷新浏览器，那么会默认请求到服务端
  // 但是服务端没做配置的话，就会返回 404 cannot GET...
  // webpack 加上这个配置的话，那么就能匹配到打包文件的 index.html
  historyApiFallback: {
    // index: '/index.html',
    rewrites: [
      {
        from: /.*/g,
        to: '/public/index.html',
      }
    ]
  },
  hot: true, // 只重加载改动的组件
  // open: true, // 每次都会自动打开页面
};

let config;

if (isDev) {
  // webpack-merge 不影响 baseConfig，因为产生的是新结果
  config = webpackMerge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    devServer,
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
                    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 把 css class 名字按规则命名
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
} else {
  config = webpackMerge(baseConfig, {
    mode: 'production',
    entry: {
      // 将类库与第三方依赖单独打包成 vendor，因为如果跟业务代码混在一起，那么由于业务经常更新所以导致这些都无法长期缓存
      app: path.join(__dirname, '../client/client-entry.js'),
    },
    output: {
      // chunkhash 与 hash 的区别：
      // chunkhash 如果你的文件不改变（类库），那么下次打包时的哈希值不会变；但是 hash 每次都会变
      // 所以第三方依赖与类库需要使用 chunkhash，否则单独打包就没意义了，也无法做长期缓存
      filename: '[name].[chunkhash:8].js',
      // ssr 生产环境没有 devServer，所以这里还得做修改
      publicPath: '/public/',
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'less-loader',
          ],
        },
      ],
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'styles.[contentHash:8].css'
      }),
      // new ExtractPlugin('styles.[hash:8].css'),
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
