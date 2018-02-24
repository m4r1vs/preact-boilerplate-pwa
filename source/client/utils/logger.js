/**
 * Log stuff to the console.
 * @example
 * logger.debug('Debugging information')
 */
export default {

	/**
	 * Log debugging information to the console. Only when logLevel at 'DEBUG'.
	 * @param {string} text - Text to be logged into the console.
	 * @param {*} [details] - More detailed addition to text (optional).
	 */
	debug: (text = '', details = null) => {
		switch (process.env.CONFIG.logLevel) {
			case 'DEBUG':
				if (details) console.debug(`[DEBUG] ${text}`, details)
				else console.debug(`[DEBUG] ${text}`)
				break
			default:
				return
		}
	},

	/**
	 * Log information to the console. Only when logLevel at 'INFO' or deeper.
	 * @param {string} text - Text to be logged into the console.
	 * @param {*} [details] - More detailed addition to text (optional).
	 */
	info: (text = '', details = null) => {
		switch (process.env.CONFIG.logLevel) {
			case 'DEBUG':
			case 'INFO':
				if (details) console.info(`[INFO] ${text}`, details)
				else console.info(`[INFO] ${text}`)
				break
			default:
				return
		}
	},

	/**
	 * Log a warning to the console. Only when logLevel at 'WARN' or deeper.
	 * @param {string} text - Text to be logged into the console.
	 * @param {*} [details] - More detailed addition to text (optional).
	 */
	warn: (text = '', details = null) => {
		switch (process.env.CONFIG.logLevel) {
			case 'DEBUG':
			case 'INFO':
			case 'WARN':
				if (details) console.warn(`[WARNING] ${text}`, details)
				else console.warn(`[WARNING] ${text}`)
				break
			default:
				return
		}
	},

	/**
	 * Log an error to the console. Only when logLevel at 'ERROR' or deeper.
	 * @param {string} text - Text to be logged into the console.
	 * @param {*} [details] - More detailed addition to text (optional).
	 */
	error: (text = '', details = null) => {
		switch (process.env.CONFIG.logLevel) {
			case 'DEBUG':
			case 'INFO':
			case 'WARN':
			case 'ERROR':
				if (details) console.error(`[ERROR] ${text}`, details)
				else console.error(`[ERROR] ${text}`)
				break
			default:
				return
		}
	}
}