'use strict';
const path = require('path')
const pascalCase = require('pascal-case')
const paramCase = require('param-case')
const pjson = require('./package.json')
const packageName = pjson.name
const filename = paramCase(packageName)
const namespace = pascalCase(filename)


module.exports = {
  externals: {
    // We are including `aurelia-logging` in the distribution so consumer do not need to include it.
  },
  devtool: 'inline-source-map',
  entry: {
    [filename]: './dist/commonjs/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${filename}.js`,
    library: namespace,
    libraryTarget: 'var'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
}
