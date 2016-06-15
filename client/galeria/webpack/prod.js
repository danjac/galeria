var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DefinePlugin = webpack.DefinePlugin;

var apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8000/';

var plugins = [
  new HtmlWebpackPlugin({
    title: 'Galeria',
    template: 'index.html',
  }),
  new ExtractTextPlugin('bundle.css', {
    allChunks: true,
  }),
  new UglifyJsPlugin({ minimize: true }),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
    __API_BASE_URL__: JSON.stringify(apiBaseUrl),
  }),
];

var entry = [
  path.join(__dirname, '../src/index.js'),
];

var output = {
  path: path.join(__dirname, '../dist'),
  filename: 'bundle.js',
}

loaders = [
  {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, '../src'),
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|woff|woff2|eot|ttf|svg)/,
    loader: 'url-loader?limit=200000',
  },
];

module.exports = {
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
};

