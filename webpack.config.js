const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')


// function to check if node env is set to production
const isProduction = () => process.env.NODE_ENV === 'production' ? true : false


// declare plugins
const plugins = [
  new HTMLWebpackPlugin({
    template: require('html-webpack-template'),
    inject: false,
    appMountId: 'app',
    title: 'React',
    scripts: isProduction() ? ['/js/modules.js'] : null 
  })
]

// add plugins depends if node env is on production 
if(isProduction()){
  plugins.push(
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  )
}

const optimization = {
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath:'/'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
          {
            loader: isProduction() ? MiniCssExtractPlugin.loader : 'style-loader'
          },
          'css-loader']
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            fallback: {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/'
              }
            }
          }
        },
      }
    ]
  },
  devServer: {
    open: true,
    progress: true,
    historyApiFallback: true
  },
  plugins: plugins,
  optimization:  isProduction() ? optimization : {}
}