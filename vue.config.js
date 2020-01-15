module.export = {
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {
      '/mainfest': {
        target: 'http://127.0.0.1:4000/manifest',
        changeOrigin: true,
        pathRewrite: {
          '^/mainfest': ''
        }
      }
    }
  }
}
