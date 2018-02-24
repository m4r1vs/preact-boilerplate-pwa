require('colors')

module.exports = prefix => {

	prefix = new Date().toLocaleDateString().grey + ' ' + new Date().toLocaleTimeString().grey + ' ['.magenta + prefix.toUpperCase().magenta + ']  '.magenta

	return {
		debug: (log) => {
			if (typeof log === 'string') console.log(prefix + log.grey)
			else console.log('Debug:\n'.grey, log)
		},

		info: (log) => {
			if (typeof log === 'string') console.info(prefix + log.cyan)
			else console.info('Info:\n'.cyan, log)
		},

		warn: (log) => {
			if (typeof log === 'string') console.warn(prefix + log.orange)
			else console.warn('Warning:\n'.orange, log)
		},

		error: (log) => {
			if (typeof log === 'string') console.error(prefix + log.red)
			else console.error('Error:\n'.red, log)
		}
	}
}