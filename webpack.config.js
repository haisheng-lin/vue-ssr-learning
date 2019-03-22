const path = require('path');
// vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
// 所以要手动在 webpack 配置中加上这个插件
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 将非 JS 的文件单独打包分离出来，这里主要是希望单独引入 CSS
const ExtractPlugin = require('extract-text-webpack-plugin');
// windows npm script 设置变量是通过 set NODE_ENV=production
// mac npm script 设置变量是 NODE_ENV=production NODE_ENV=production
// 使用 cross-env 可以统一设置环境变量的方式: cross-env 
const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 如果尺寸小于 1024KB, url-loader 把图片转成 base64 格式
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new VueLoaderPlugin(),
    new HtmlPlugin(),
  ],
};

if (isDev) {
  config.module.rules.push({
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
  });
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = { // 支持热更新
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true, // 只重加载改动的组件
    // open: true, // 每次都会自动打开页面
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );
} else {
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push(
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
    }
  );
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css'),
  );
}

module.exports = config;
