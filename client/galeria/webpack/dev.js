var path = require('path');
var webpack = require('webpack');
var DefinePlugin = webpack.DefinePlugin;
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var serverPort = 3000;

var plugins = [
  new HtmlWebpackPlugin({
    title: 'Galeria',
    template: 'index.html',
  }),
  new ExtractTextPlugin('bundle.css'),
  new DefinePlugin({
    __API_BASE_URL__: JSON.stringify('http://localhost:8000/'),
  }),
  new HotModuleReplacementPlugin(),
];

var entry = [
  'webpack-dev-server/client?http://localhost:' + serverPort,
  'webpack/hot/only-dev-server',
  path.join(__dirname, '../src/index.js'),
];

var output = {
  path: path.join(__dirname, '../dist'),
  filename: 'bundle.js',
  publicPath: 'http://localhost:' + serverPort + '/',
};

var loaders = [
  {
    test: /\.js$/,
    loaders: ['react-hot', 'babel'],
    include: path.join(__dirname, '../src'),
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
  },
  {
    test: /\.(png|woff|woff2|eot|ttf|svg)/,
    loader: 'url-loader?limit=200000',
  },
];

module.exports = {
  devtool: 'eval',
  entry: entry,
  plugins: plugins,
  output: output,
  module: {
    loaders: loaders
  },
  resolve: {
    root: path.join(__dirname, '../src'),
    extensions: ['', '.js']
  },
  serverPort: serverPort,
};
