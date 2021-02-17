import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import './DashboardHeader.css'

export default function DashboardHeader({
	numActivities = 0,
	handleLogOut,
	subHeaderText,
	numText,
}) {
	/**
	 * this component renders the main dashboard header and navigation
	 */
	const match = useRouteMatch()
	const history = useHistory()
	const logOut = () => {
		handleLogOut()
		history.push('/')
	}
	/**
	 * middle nav button is conditionally rendered, depending on the current location
	 */
	const renderMiddleButton = () => {
		if (match.path !== '/account') {
			return (
				<Link className='navlink__item' to='/account'>
					Account
				</Link>
			)
		}
		return (
			<Link className='navlink__item' to='/dashboard'>
				Home
			</Link>
		)
	}
	return (
		<header className='dashboard__header'>
			<div className='header__text'>
				<h1>BuddyUp</h1>
				{subHeaderText || numActivities ? (
					<div>
						{subHeaderText && <h2>{subHeaderText}</h2>}
						{numActivities && numText ? (
							<div>
								{numActivities} {numText}
							</div>
						) : null}
					</div>
				) : null}
			</div>
			<nav className='header__nav'>
				<ul className='navlink__list'>
					<Link
						className='navlink__item'
						to='/new-activity'
					>
						Add Activity
					</Link>
					{renderMiddleButton()}
					<li
						onClick={() => logOut()}
						className='navlink__item'
					>
						Log Out
					</li>
				</ul>
			</nav>
		</header>
	)
}
