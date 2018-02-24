require('colors')
const webpack = require('webpack')
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')

// Plugins:
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Jarvis = require('webpack-jarvis')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const OnBuildWebpackPlugin = require('on-build-webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FlushWebpackPlugin = require('webpack-flush-chunks-html')
const ExtractCssPlugin = require('extract-css-chunks-webpack-plugin')
const CleanBuildOnWatchPlugin = require('clean-build-on-watch-webpack-plugin')

module.exports = (env, logger) => {

	// delete build folder before initial build (not every build on --watch)
	shell.rm('-rf', env.BUILD_DIR)

	// these plugins will be used every time, in development mode and production mode
	const plugins = [

		// bundles all javascript that different chunks have in common into one file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),


		// bundle all used CSS into one big file
		new ExtractCssPlugin({
			filename: 'static/[name].[hash].styles.css'
		}),


		// these constants can be used everywhere (see docs for more info and remember to add to .eslintrc)
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		}),


		// gets the template.html file and injects the used JS into it as well as some variables
		new HtmlWebPackPlugin({
			template: path.join(__dirname, './source/client/template.ejs'),
			inject: true, // injects all JS at the body of the JS file
			filename: 'index.html', // the exported filename
			minify: { // using attributes from https://github.com/kangax/html-minifier#options-quick-reference
				collapseWhitespace: true,
				removeComments: true
			},
			customVars: { // custom variables that will be injected into the HTML template
				title: require('./source/client/manifest.json').name || 'Error getting title from manifest.json',
				themeColor: require('./source/client/manifest.json').theme_color || '#fff',
				fonts: JSON.stringify(['Roboto:300,300i', 'Material+Icons'])
				// TODO: favicon: require('./source/client/manifest.json').favicon
			}
		}),


		// add Service Worker
		new ServiceWorkerWebpackPlugin({
			entry: path.join(__dirname, './source/client/utils/service-worker.js')
		}),


		// Plugin to insert CSS files into HTML as __CSS_CHUNKS__, made by me (m4r1vs), so, ask if you have questions
		new FlushWebpackPlugin({
			log: true,
			excludedChunks: ['main'],
			inject: 'body'
		}),


		// copy assets and manifest into build folder
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, '/source/client/manifest.json'),
				to: 'manifest.json'
			},
			{
				from: path.join(__dirname, '/source/client/assets'),
				to: 'assets'
			}
		], { copyUnmodified: true })

	]

	// these plugins get only used when webpack is started in production mode with the -p flag
	const localProductionPlugins = [

		// adds <link rel="preload"/> to html file to preload JS and CSS
		new PreloadWebpackPlugin({
			rel: 'preload', // could be set to "prefetch"
			include: ['main', 'common'] // the JS files to include (we don't want to include chunks)
		}),


		// a native webpack optimizer, makes JS load faster and small size improvements
		new webpack.optimize.ModuleConcatenationPlugin(),


		// use bundle analyzer plugin, only if analyzer set in config
		new BundleAnalyzerPlugin({
			analyzerMode: env.ANALYZE_SERVER ? 'server' : env.CONFIG.analyzer && env.CONFIG.analyzer.mode,
			generateStatsFile: env.CONFIG.analyzer && env.CONFIG.analyzer.generateStatsFile,
			statsFilename: env.CONFIG.analyzer && `${env.BUILD_DIR}/../../webpack-bundle-breakdown.json`,
			statsOptions: env.CONFIG.analyzer && env.CONFIG.analyzer.statsOptions
		}),


		// use UglifyJS to make JS smaller
		new UglifyJsPlugin({
			uglifyOptions: env.CONFIG.uglifyJs
		}),


		// if analyzer is exporting JSON, process it and save "bundle-size.md" to root
		new OnBuildWebpackPlugin(() => {
			if (env.CONFIG.analyzer.generateStatsFile) {
				const exec = require('child_process').exec
				exec('yarn analyze:process', err => {
					if (err) console.error(err)
				})
			}
		})

	]

	// these plugins get only used when webpack is started in development mode with the -d flag
	const localDevelopmentPlugins = [

		// using plugin to clean build folder on watch, made by me (m4r1vs), so, ask if you have questions
		new CleanBuildOnWatchPlugin(),


		// using browser-sync to serve files during development (gets only involved when --watch flag present)
		new BrowserSyncPlugin({
			host: 'localhost',
			port: env.CONFIG.port,
			server: { baseDir: [env.BUILD_DIR] }
		}),


		// export build hash into seperate file in build folder
		new OnBuildWebpackPlugin(stats => {
			fs.writeFile(env.BUILD_DIR + '_build_hash.json', JSON.stringify({ hash: stats.hash }), err => {if (err) logger.error(err)})
		})

	]

	if (env.CONFIG.dashboard && env.CONFIG.dashboard.port && env.NODE_ENV === 'development') {

		// add Jarvis WebPack interface to webpack plugins
		plugins.push(new Jarvis({
			port: env.CONFIG.dashboard.port
		}))
	}

	// depending on the current env, merge plugins with either devPlugins or prodPlugins:
	return (env.NODE_ENV !== 'production')
		? plugins.concat(localDevelopmentPlugins)
		: plugins.concat(localProductionPlugins)
}
