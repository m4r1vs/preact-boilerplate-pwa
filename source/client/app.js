import { h, Component } from 'preact'

import { DashboardIcon, PizzaIcon, LogoutIcon, SettingsIcon } from './components/icons'

import Header from './components/Header'
import Drawer from './components/Drawer'
import Router from './views'

import './global.scss'

export default class App extends Component {

	render = () => (
		<div>
			<Header />
			<Drawer
				mainLinks={[
					{
						url: '/',
						label: 'Home',
						Icon: <DashboardIcon />
					},
					{
						url: '/lol',
						label: 'Lol',
						Icon: <PizzaIcon />
					}
				]}
				secondaryLinks={[
					{
						onClick: () => alert('Lol'),
						label: 'Log Out',
						Icon: <LogoutIcon />
					},
					{
						url: '/hr',
						label: 'Settings',
						Icon: <SettingsIcon />
					}
				]}
				username="Marius Niveri"
				eMail="marius.niveri@gmail.com"
				profilePicture="http://sguru.org/wp-content/uploads/2017/06/cool-anonymous-profile-pictures-1699946_orig.jpg"
				headerPicture="https://storge.pic2.me/c/1360x800/696/57ed1b25de87e.jpg" />
			
			<main id="main_component">
				<Router />
			</main>

		</div>
	)
}