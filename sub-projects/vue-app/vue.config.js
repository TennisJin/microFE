const webpackConfig = require('./webpack.config')

module.exports = {
  publicPath: '//localhost:4000/',
  css: {
    extract: false
  },
  configureWebpack: webpackConfig,
  devServer: {
    contentBase: './', // 开发环境项目路径
    compress: true
  }
}
