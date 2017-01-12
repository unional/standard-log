'use strict';
const paramCase = require('param-case')
const pascalCase = require('pascal-case')
const path = require('path')

const pjson = require('./package.json')

const packageName = pjson.name
const filename = paramCase(packageName)
const globalVariable = pascalCase(filename)

module.exports = {
  externals: {
    "color-map": "ColorMap"
  },
  devtool: 'source-map',
  entry: {
    [filename]: './dist/commonjs/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${filename}.js`,
    library: globalVariable,
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: "source-map-loader",
        test: /\.js?$/
      }
    ]
  }
}
