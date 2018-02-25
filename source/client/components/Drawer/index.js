import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

import style from './style.scss'

export default class NavigationDrawer extends Component {

	moreOpened = false

	componentDidMount = () => {
		const panel = document.getElementById('main_component')
		const { drawer, greyback } = this

		window.navigationDrawer = {}

		let drawerwidth = drawer.offsetWidth
		let startx = 0
		let distgrey = 0
		let open = false
		let greybackstartx = 0

		const drawerTransition = (state, bezier) => {
			if (state) {
				if (bezier === 'in') {
					drawer.style.transition = 'transform .225s cubic-bezier(0.0, 0.0, 0.2, 1), opacity .225s cubic-bezier(1,0,1,0)'
				}
				else if (bezier === 'out') {
					drawer.style.transition = 'transform .195s cubic-bezier(0.4, 0.0, 0.6, 1), opacity .195s cubic-bezier(1,0,1,0)'
				}
				greyback.style.transition = 'opacity .225s linear'
			}
			else {
				drawer.style.transition = 'none'
				greyback.style.transition = 'none'
			}
		}

		const drawerClosing = () => {
			document.body.style.overflow = 'auto'
			drawer.style.transform = `translateX(-${drawerwidth}px)`
			drawer.style.opacity = '0'
			greyback.style.opacity = '0'
			setTimeout(() => {
				greyback.style.display = 'none'
			}, 225)
		}

		const drawerOpening = () => {
			document.body.style.overflow = 'hidden'
			drawer.style.transform = `translateX(0px)`
			drawer.style.opacity = '1'
			greyback.style.opacity = '1'
			greyback.style.display = 'block'
		}

		window.navigationDrawer.close = immidiate => {
			if (!immidiate) {
				drawerTransition(true, 'out')
			}
			else {
				drawerTransition(false, false)
			}
			drawerwidth = drawer.offsetWidth
			drawerClosing()
		}

		window.navigationDrawer.open = () => {
			drawer.style.transition = 'transform .16s cubic-bezier(0.0, 0.0, 0.2, 1)'
			greyback.style.transition = 'opacity .16s linear'
			drawerwidth = drawer.offsetWidth
			drawerOpening()
		}

		window.addEventListener('resize', () => {
			window.navigationDrawer.close(true)
		})

		panel.addEventListener('touchstart', e => {
			let touchobj = e.changedTouches[0]

			startx = parseInt(touchobj.clientX, 10)
			if (startx < 25 && !window.navigationDrawer.disabled) {
				drawerTransition(false, false)
				drawer.style.opacity = '1'
				greyback.style.opacity = '0'
				greyback.style.display = 'block'
				open = true
			}
			else {
				open = false
			}
		}, {
			passive: true
		})

		panel.addEventListener('touchmove', e => {
			let touchobj = e.changedTouches[0]
			let dist = parseInt(touchobj.clientX, 10) - startx
			if (open) {
				document.body.style.overflow = 'hidden'
				drawerwidth = drawer.offsetWidth

				if (dist <= drawerwidth) {
					drawer.style.transform = `translateX(${dist - drawerwidth}px)`
					greyback.style.opacity = dist / drawerwidth
				}
			}
		}, {
			passive: true
		})

		panel.addEventListener('touchend', e => {
			let touchobj = e.changedTouches[0] // Der erste Finger der den Bildschirm berührt wird gezählt
			if (open) {
				drawerTransition(true, 'in')
				if (touchobj.clientX > 95) {
					greyback.style.opacity = '1'
					drawer.style.transform = `translateX(0px)`
				}
				else {
					drawerClosing()
				}
			}
		}, {
			passive: true
		})

		greyback.addEventListener('touchstart', e => {
			drawerTransition(false, false)
			let touchobj = e.changedTouches[0] // Der erste Finger der den Bildschirm berührt wird gezählt
			greybackstartx = parseInt(touchobj.clientX, 10)
		}, {
			passive: true
		})

		greyback.addEventListener('touchmove', e => {
			let touchobj = e.changedTouches[0]
			distgrey = parseInt(touchobj.clientX, 10) - greybackstartx
			if (distgrey < 0) {
				drawerwidth = drawer.offsetWidth

				drawer.style.transform = `translateX(${distgrey}px)`
				greyback.style.opacity = 1 - (Math.abs(distgrey / drawerwidth))
			}
		}, {
			passive: true
		})

		greyback.addEventListener('touchend', () => {
			drawerwidth = drawer.offsetWidth

			if (distgrey > -80) {
				drawerTransition(true, 'in')
				drawerOpening()
			}
			else {
				drawerTransition(true, 'out')
				drawerClosing()
			}
		}, {
			passive: true
		})

		document.querySelectorAll('.applyHoverEffect').forEach((element) => {
			const hoverColor = element.getAttribute('fill') // get the fill color

			// set it as a custom property inline
			if (hoverColor) element.style.setProperty('--hover-color', hoverColor)
		})
	}

	closeDrawer = () => window.navigationDrawer.close()

	toggleMore = () => this.setState(prev => (
		{ moreOpened: !prev.moreOpened}
	))

	renderLinks = links => (
		<span>
			{links.map(link => (
				<Link
					key={link.url}
					activeClassName="active"
					href={link.url}
					onClick={link.onClick || this.closeDrawer}>

					<span transition="fadeIn">
						{link.Icon}
						{link.label}
					</span>
									
				</Link>
			))}
		</span>
	)

	render = ({ mainLinks, secondaryLinks, profilePicture, headerPicture, eMail, username }) => {
		return (
			<div class={style.this}>

				<nav ref={nav => { this.drawer = nav }}>

					{/* The top part of the drawer */}
					<section class={style.header} style={{
						backgroundImage: `url(${headerPicture})`
					}}>
						<div>
							<div onClick={this.toggleMore} class={style.profilePicture} style={{
								backgroundImage: `url(${profilePicture})`
							}}/>
							<span onClick={this.toggleMore} class={style.username}>{username}</span><br />
							<span onClick={this.toggleMore} class={style.email}>{eMail}</span>
							<i
								onClick={this.toggleMore}
								onKeyPress={this.toggleMore}
								tabIndex="0"
								role="button"
								class={'material-icons ' + (this.state.moreOpened && style.moreOpened)}>
									&#xE5C5;
							</i>
						</div>
					</section>

					{/* The content of the drawer */}
					<section class={style.links}>
							
						<div style={{ display: this.state.moreOpened ? 'none' : 'block' }}>

							{this.renderLinks(mainLinks)}

						</div>

						<hr />
							
						<div style={{ display: !this.state.moreOpened ? 'none' : 'block' }}>

							{this.renderLinks(secondaryLinks)}

						</div>

					</section>

				</nav>

				<div
					ref={div => {this.greyback = div}}
					class={style.greyBack}
					onClick={this.closeDrawer}
					onKeyPress={this.closeDrawer}
					tabIndex="0"
					role="button" />

			</div>
		)
	}
}