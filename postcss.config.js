const autoprefixer = require('autoprefixer');

// less -> css, css 还需要再优化，那么就需要 postcss，例如浏览器不同导致样式前缀不一样
module.exports = {
  plugins: [
    autoprefixer(),
  ],
};
