import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import config from '../../config'
import TokenService from '../../services/token-service'
import DashboardHeader from '../dashboard/DashboardHeader/DashboardHeader'
import Activity from './Activity/Activity'
import Request from './Request/Request'
import './Account.css'
import AccountActivityList from './AccountActivityList/AccountActivityList'
import AccountRequestList from './AccountRequestList/AccountRequestList'

export default function Account() {
	const history = useHistory()
	const [error, setError] = useState(null)
	const [activities, setActivities] = useState([])
	const [requests, setRequests] = useState([])
	const [toggleList, handleToggleList] = useState(false)

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
				console.log(data)
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
		<>
			<DashboardHeader />
			<main>
				<section className='account__section__wrapper '>
					<nav className='account__nav'>
						{!toggleList ? (
							<>
								<button
									className='on'
									onClick={() =>
										handleToggleList(false)
									}
								>
									Your Activities
								</button>
								<button
									onClick={() =>
										handleToggleList(true)
									}
								>
									Your Requests
								</button>
							</>
						) : (
							<>
								<button
									onClick={() =>
										handleToggleList(false)
									}
								>
									Your Activities
								</button>
								<button
									className='on'
									onClick={() =>
										handleToggleList(true)
									}
								>
									Your Requests
								</button>
							</>
						)}
					</nav>
					{!toggleList ? (
						<AccountActivityList
							activities={activities}
						/>
					) : (
						<AccountRequestList requests={requests} />
					)}
				</section>
			</main>
		</>
	)
}
