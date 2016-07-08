var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react&presets[]=stage-0'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style!css' // We add the css loader
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.png$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.jpg$/,
      loader: 'file-loader'
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
      loader: 'file'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    sourceMapFilename: '[file].map',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname)]
  },
  devtool: 'source-map'
};
