var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=assets/[name].[ext]',
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }],
  },
  resolve: {
    modulesDirectories: ['./node_modules', './src', './assets'],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.png', '.svg']
  },
  output: {
    path: path.join(__dirname, '/app'),
    publicPath: '/app',
    sourceMapFilename: '[file].map',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PAPERNET_HOST': JSON.stringify('http://127.0.0.1:1705'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname)]
  },
  devtool: 'source-map'
};
