import logger from '../utils/logger'

export default async () => {
	try {
		logger.info('State initialized')
		return true
	} catch (err) {
		logger.error('Error initializing state: ', err)
		return null
	}
}