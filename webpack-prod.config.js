var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: null,
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: '/app/',
  },
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
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.png']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      'process.env.PAPERNET_HOST': JSON.stringify('https://bobi.space'),
    }),
  ],
};
