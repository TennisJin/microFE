const StatsPlugin = require('stats-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const path = require('path')

module.exports = {
  output: {
    // filename: '[name].js',
    // chunkFilename: '[name].js',
    // path: path.resolve(__dirname, 'dist'),
    library: 'subAngular',
    libraryTarget: 'window'
  },
  optimization: { // webpack自带公共chunk分离，减少打包体积，提高缓存命中
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空输出目录
    new StatsPlugin('manifest.json', {
      chunkModules: false,
      entrypoints: true,
      source: false,
      chunks: false,
      modules: false,
      assets: false,
      children: false,
      exclude: [/node_modules/]
    })
  ],
  devtool: 'none'
}
