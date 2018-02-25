import { h, Component } from 'preact'
import Router from 'preact-router'
import ViewWrapper from './wrapper'
import AsyncRoute from '../utils/async-preact-route'

export default class Routes extends Component {

	render = () => (
		<Router>
			
			<ViewWrapper
				path="/"
				padding
				background="#fafafa"
				primaryColor="#175854"
				header={{
					title: 'Home',
					appearance: 'normal',
					buttonAppearance: 'hamburger'
				}}>
				<AsyncRoute
					loadFunction={() => import(/* webpackChunkName: "home_view" */ './Home').then(module => module.default)} />
			</ViewWrapper>

			<ViewWrapper
				path="/lol"
				padding
				background="#fff"
				primaryColor="#0e1460"
				header={{
					title: 'LoL',
					appearance: 'expanded',
					buttonAppearance: 'arrow'
				}}>
				<h1>Hello YOu</h1>
			</ViewWrapper>

			<ViewWrapper
				default
				path="*"
				padding
				background="#282f35"
				primaryColor="#fefefe"
				header={{
					title: '404 :/',
					appearance: 'hidden',
					buttonAppearance: 'hamburger'
				}}>
				<center>
					Error 404
				</center>
			</ViewWrapper>

		</Router>
	)
}
