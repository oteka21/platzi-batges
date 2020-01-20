const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    modules: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '[name]-manifest.json')
    })
  ]
}