import React from 'react'
import { Link } from 'react-router-dom'
import './DashboardHeader.css'

export default function DashboardHeader({
	numActivities,
	handleLogOut,
}) {
	return (
		<header className='dashboard__header'>
			<div className='header__text'>
				<h1>BuddyUp</h1>
				<h2>Find or create your next event</h2>
				<div>{numActivities} events in your area</div>
			</div>
			<nav className='header__nav'>
				<ul className='navlink__list'>
					<Link
						className='navlink__item'
						to='/new-activity'
					>
						Add Activity
					</Link>
					<Link
						className='navlink__item'
						to='activity-requests'
					>
						Activity Requests
					</Link>
					<li
						onClick={handleLogOut}
						className='navlink__item'
					>
						Log Out
					</li>
				</ul>
			</nav>
		</header>
	)
}
