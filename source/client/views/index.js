import { h, Component } from 'preact'
import Router from 'preact-router'
import AsyncRoute from '../utils/async-preact-route'

export default class Routes extends Component {

	render = () => (
		<Router>

			<AsyncRoute
				path="/"
				loadFunction={() => import(/* webpackChunkName: "home_view" */ './Home').then(module => module.default)} />

			<div default>
				<center>
					loading...
				</center>
			</div>

		</Router>
	)
}
