const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  devServer: {
    contentBase: './src',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
  ],
});
