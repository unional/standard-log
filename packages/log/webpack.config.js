'use strict';
const paramCase = require('param-case')
const pascalCase = require('pascal-case')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const pjson = require('./package.json')

const filename = paramCase(pjson.name)
const globalVariable = pascalCase(filename)

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.ts',
  externals: {
    'global-store': 'GlobalStore'
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
    path: path.resolve('dist'),
    filename: `${filename}.js`,
    library: globalVariable
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    mainFields: ['browser', 'main']
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CompressionPlugin()
  ]
}
