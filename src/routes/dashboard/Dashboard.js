import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import config from '../../config'
import TokenService from '../../services/token-service'
import Activity from './ActivitiesList/Activity/Activity'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader/DashboardHeader'

export default function Dashboard() {
	const history = useHistory()
	const [error, setError] = useState(null)
	const [activities, setActivities] = useState([])
	const numActivities = activities.length || 0
	useEffect(() => {
		/**
		 * on mount, fetch local activities.
		 *  This is an unprotected api route.
		 *
		 */
		const getLocalActivities = async () => {
			try {
				const response = await fetch(
					`${config.API_ENDPOINT}/activities/local`,
					{
						method: 'GET',
						headers: {
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
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
			getLocalActivities()
		}
		return () => {}
	}, [error])

	const handleLogOut = () => {
		TokenService.clearAuthToken()
		history.push('/')
	}
	const text = {
		subHeaderText: 'Find or create your next event',
		numText: 'events in your area',
	}
	return (
		<main>
			<DashboardHeader
				props={numActivities}
				numActivities={numActivities}
				handleLogOut={handleLogOut}
				{...text}
			/>
			<section className='event__section'>
				{activities.length < 1 && (
					<p>
						There are no activities in your area. Try
						making one of your own!
					</p>
				)}
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
