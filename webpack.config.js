'use strict';

const path = require('path');

module.exports = {
  context: `${__dirname}/client`,
  entry: {
    app: ['./Index.jsx', './index.html'],
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/_build`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: { modules: true }},
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '_build'),
    watchContentBase: true,
    compress: true,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
