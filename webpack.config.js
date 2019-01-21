const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: [
      './js/main.js'
    ]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/dist/'
  },
  devServer: {
    contentBase: './app'
  }
}
