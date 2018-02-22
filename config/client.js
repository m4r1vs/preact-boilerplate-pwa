const path = require('path')

module.exports = NODE_ENV => {
	
	const DEV = NODE_ENV === 'development'

	return {
		analyzer: {
			generateStatsFile: DEV
		},
		build_dir: path.resolve(__dirname, '../build/client'),
		devtool: DEV ? 'source-map' : false,
		jarvis: DEV ? {
			port: 1337
		} : null,
		uglifyJs: {
			ie8: false,
			warnings: DEV,
			sourceMap: DEV,
			compress: {
				warnings: DEV,
				drop_console: false
			}
		},
		DEBUG: DEV,
		logLevel: DEV ? 'DEBUG' : 'ERROR',
		polyfills: DEV ? [] : ['fetch', 'Promise']
	}
}