// 所有环境都需要的 webpack 配置都写在这里
const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');
const { VueLoaderPlugin } = require('vue-loader');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '//127.0.0.1:8000/public/',
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: path.join(__dirname, 'node_modules'),
        enforce: 'pre', // 对这几种类型的文件，使用 loader 加载前用 eslint-loader 先加载
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client'),
        exclude: path.join(__dirname, 'node_modules'),
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
              name: 'resources/[path][name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
