const paramCase = require('param-case').paramCase
const pascalCase = require('pascal-case').pascalCase
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const pjson = require('./package.json')
const { NormalModuleReplacementPlugin } = require('webpack')

const filename = paramCase(pjson.name)
const globalVariable = pascalCase(filename)

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './ts/index.ts',
  externals: {
    'standard-log': 'StandardLog'
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        options: {
          configFile: 'tsconfig.dist-esm.json'
        }
      }
    ]
  },
  output: {
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false
    },
    path: path.resolve('dist'),
    filename: `${filename}.esm.js`,
    library: globalVariable
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    mainFields: ['browser', 'main']
  },
  plugins: [
    new NormalModuleReplacementPlugin(/.js$/, (resource) => {
      if (/node_modules/.test(resource.context)) return
      resource.request = resource.request.replace(/.js$/, '')
    }),
    new CompressionPlugin()
  ]
}
