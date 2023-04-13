'use strict'
const paramCase = require('param-case').paramCase
const pascalCase = require('pascal-case').pascalCase
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const { NormalModuleReplacementPlugin } = require('webpack')

const pjson = require('./package.json')

const filename = paramCase(pjson.name)
const globalVariable = pascalCase(filename)

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: './ts/index.ts',
	externals: {
		'global-store': 'GlobalStore'
	},
	module: {
		rules: [
			{
				loader: 'ts-loader',
				test: /\.tsx?$/,
				options: {
					configFile: 'tsconfig.dist-es5.json'
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
		filename: `${filename}.es5.js`,
		library: globalVariable
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		mainFields: ['browser', 'main']
	},
	plugins: [
		new NormalModuleReplacementPlugin(/.js$/, resource => {
			if (/node_modules/.test(resource.context)) return
			resource.request = resource.request.replace(/.js$/, '')
		}),
		new CompressionPlugin()
	]
}
