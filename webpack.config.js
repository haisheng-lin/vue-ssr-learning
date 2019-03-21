const path = require('path');
// vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
// 所以要手动在 webpack 配置中加上这个插件
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
