import logger from '../utils/logger'
import { auth } from './firebase'

export default async () => {
	try {

		auth.onAuthStateChanged(user => {
			logger.debug('Firebase auth state changed: ', user || 'not logged in')
		})

		logger.info('State initialized')
		return true
		
	} catch (err) {
		logger.error('Error initializing state: ', err)
		return null
	}
}