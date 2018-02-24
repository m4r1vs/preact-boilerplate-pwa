require('colors')
const path = require('path')
const packageJSON = require('./package.json')
const ExtractCssPlugin = require('extract-css-chunks-webpack-plugin')

// nice logging
const logger = require('./helpers/node-logger')(packageJSON.name)

// set NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'

// pass arguments into ATTR by adding flag --env.variable='content', ATTRIBUTES.variable equals 'content' then
module.exports = (ATTRIBUTES = {}) => {

	let env = ATTRIBUTES
	env.BUILD_DIR = path.resolve(__dirname, './build/client')
	env.NODE_ENV = process.env.NODE_ENV
	env.CSS_VARIABLES = require('./css.variables')
	env.APP_VERSION = packageJSON.version
	env.CONFIG = require('./config/client')(env.NODE_ENV)

	logger.info(`Starting build of ${packageJSON.name || 'UNKNOWN'} in ${env.NODE_ENV} mode with log-level at ${env.CONFIG.logLevel}.`)

	return {

		devtool: env.CONFIG.devtool,

		performance: {
			hints: 'warning' // spit out warnings if assets are too big
		},

		context: __dirname,

		entry: {
			main: path.join(__dirname, '/source/client/entry.js')
		},

		output: {
			path: env.CONFIG.build_dir, // everything gets bundled into this folder
			filename: 'static/[name].[hash].bundle.js', // add a hash to the files so we can cache them forever
			chunkFilename: 'static/[name].[chunkhash].chunk.js',
			publicPath: '/', // all HTML-requests have '/' as root for relative links
			pathinfo: true
		},

		// get plugins from webpack.plugins.js
		plugins: require('./webpack.plugins.js')(env, logger),

		module: {
			rules: [

				{
					// Use Babel to process JavaScript files
					test: /\.js$/,
					exclude: [/node_modules/],
					use: {
						loader: 'babel-loader'
					}
				},

				{
					// use ExtractTextPlugin to save postcss-processed CSS into one big file
					test: /\.scss$/,
					use: ExtractCssPlugin.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1,
									modules: true,
									localIdentName: env.NODE_ENV === 'development' ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:8]' // name of CSS classes, add component-name when in DEBUG
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									plugins: () => [
										require('postcss-nested')(), // allows SCSS-like syntax
										require('postcss-cssnext')({
											warnForDuplicates: false,
											features: {
												customProperties: {
													variables: env.CSS_VARIABLES
												}
											}
										})
									]
								}
							}
						]
					})
				}

			]
		},

		resolve: {
			alias: {

				// needed to make importing react components work
				'react': 'preact-compat',
				'react-dom': 'preact-compat'

			}
		}
	}
}
