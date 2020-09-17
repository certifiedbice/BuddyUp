import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import config from '../../config'
import TokenService from '../../services/token-service'
import Activity from './Activity/Activity'
import Request from './Request/Request'

export default function Account() {
	const history = useHistory()
	const [error, setError] = useState(null)
	const [activities, setActivities] = useState([])
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const getUserActivities = async () => {
			try {
				const response = await fetch(
					`${config.API_ENDPOINT}/activities/`,
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

		const getUserRequests = async () => {
			try {
				const response = await fetch(
					`${config.API_ENDPOINT}/signups`,
					{
						method: 'GET',
						headers: {
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
					}
				)
				const data = await response.json()
				if (data.error) throw data.error

				setRequests(data)
			} catch (error) {
				setError(error)
			}
		}

		if (!error) {
			getUserActivities()
			getUserRequests()
		}
		return () => {}
	}, [error])

	return (
		<main>
			<section className='account-activity__section'>
				<ul className='account-activity__list'>
					{activities &&
						activities.map((activity) => (
							<Activity
								key={`activity-${activity.id}`}
								{...activity}
							/>
						))}
				</ul>
			</section>

			<section className='account-requests__section'>
				<ul className='account-requests__list'>
					{requests &&
						requests.map((request) => (
							<Request
								key={`request-${request.id}`}
								{...request}
							/>
						))}
				</ul>
			</section>
		</main>
	)
}
