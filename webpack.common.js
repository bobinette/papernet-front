const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/app'),
    publicPath: '/app',
    sourceMapFilename: '[file].map',
    filename: 'bundle.js',
  },
  resolve: {
    modules: ['./node_modules', './src', './assets'],
    extensions: ['.js', '.jsx', '.json', '.scss', '.png', '.svg'],
  },
  devServer: {
    contentBase: './src',
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.PAPERNET_HOST': JSON.stringify('http://127.0.0.1:1705'),
    }),
  ],
};
