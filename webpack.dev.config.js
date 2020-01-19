const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader']
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        },
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
      title: 'React',
    })
  ]
}