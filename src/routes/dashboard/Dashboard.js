import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import config from '../../config'
import TokenService from '../../services/token-service'
import Activity from './ActivitiesList/Activity/Activity'
import './Dashboard.css'

export default function Dashboard() {
	const history = useHistory()
	const [error, setError] = useState(null)
	const [activities, setActivities] = useState([])

	useEffect(() => {
		const getActivities = async () => {
			try {
				const response = await fetch(
					`${config.API_ENDPOINT}/activities`,
					{
						method: 'GET',
					}
				)
				const data = await response.json()
				if (data.error) throw data.error

				setActivities(data)
			} catch (error) {
				setError(error)
			}
		}

		if (!error) {
			getActivities()
		}
		return () => {}
	}, [error])

	const handleLogOut = async () => {
		try {
			await TokenService.clearAuthToken()
			history.push('/')
		} catch (error) {
			setError(error.message)
		}
	}
	return (
		<main>
			<header className='dashboard__header'>
				<h1>BuddyUp</h1>
				<h2>Find or create your next event</h2>
				<div>{activities.length} events in your area</div>
				<div>
					<button onClick={handleLogOut}>LOGOUT</button>
				</div>
			</header>
			<section className='event__section'>
				<ul className='event__list'>
					{activities &&
						activities.map((activity) => (
							<Activity
								key={activity.id}
								{...activity}
							/>
						))}
				</ul>
			</section>
		</main>
	)
}
