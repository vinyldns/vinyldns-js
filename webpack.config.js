var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './src/vinyldns.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'vinyldns.bundle.js',
    library: 'VinylDns',
    libraryTarget: 'commonjs',
    libraryExport: 'default'
  },
  target: 'node',
  module: {
    rules: [
      {
         use: {
            loader:'babel-loader',
            options: { presets: ['es2015'] }
         },
         test: /\.js$/,
         exclude: /node_modules/
      }
    ]
  },
  mode: 'production'
};
