'use strict';
const paramCase = require('param-case').paramCase
const pascalCase = require('pascal-case').pascalCase
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const pjson = require('./package.json')

const filename = paramCase(pjson.name)
const globalVariable = pascalCase(filename)

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.ts',
  externals: {
    'standard-log': 'StandardLog'
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        options: {
          configFile: 'tsconfig.dist.json'
        }
      }
    ]
  },
  output: {
    environment: {
      arrowFunction: false
    },
    path: path.resolve('dist'),
    filename: `${filename}.js`,
    library: globalVariable
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    mainFields: ['browser', 'main']
  },
  plugins: [new CompressionPlugin()]
}
