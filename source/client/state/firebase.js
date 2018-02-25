const config = {
	apiKey: 'AIzaSyCzGTQ9yO4va-NOlNpqI4VRrzURQu0PQdE',
	authDomain: 'managed-me.firebaseapp.com',
	databaseURL: 'https://managed-me.firebaseio.com',
	projectId: 'managed-me',
	storageBucket: 'managed-me.appspot.com',
	messagingSenderId: '303837844694'
}

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const messaging = firebase.messaging()

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const githubAuthProvider = new firebase.auth.GithubAuthProvider()
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()