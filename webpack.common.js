const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, '/app'),
    publicPath: '/app/',
    sourceMapFilename: '[file].map',
    filename: '[name].js',
  },
  resolve: {
    modules: ['./node_modules', './src', './assets'],
    extensions: ['.js', '.jsx', '.json', '.scss', '.png', '.svg'],
  },
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
    // Nicer display when building
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
    }),

    // Code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // But since there are no more common modules between them we end up with just the runtime code included
      // in the manifest file
      name: 'manifest',
    }),

    // Extract css files to have a lighter bundle
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],
};
