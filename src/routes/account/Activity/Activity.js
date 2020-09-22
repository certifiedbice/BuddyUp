import React, { useState, useEffect } from 'react'
import config from '../../../config'
import TokenService from '../../../services/token-service'
import ActivityRequestsList from '../ActivityRequestsList/ActivityRequestsList'
import './Activity.css'

export default function Activity({
	description = 'Test event description 5',
	end_time = '2020-12-25T13:00:00.000Z',
	id = 5,
	start_time = '2020-12-25T12:00:00.000Z',
	title = 'Test Event 5',
	user_id = 6,
	zip_code = 12345,
}) {
	const [toggle, handleToggle] = useState(false)
	const [requests, setRequests] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const getActivityRequests = async () => {
			try {
				console.log('Hello!')
				const response = await fetch(
					`${config.API_ENDPOINT}/signups?activity_id=${id}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
					}
				)
				const data = await response.json()
				if (data.error) throw data.error
				console.log(data)
				setRequests(data)
			} catch (error) {
				setError(error)
			}
		}
		if (!error) {
			getActivityRequests()
		}
		return () => {}
	}, [id, error])

	let s = new Date(start_time)
	let e = new Date(end_time)
	let sTime = s.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	let eTime = e.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<>
			<li
				className='activity__list__item'
				onClick={() => handleToggle((prev) => !prev)}
			>
				<h2>{title}</h2>
			</li>

			{toggle && (
				<div className='account__modal'>
					<div className='expanded__activity'>
						<div className=' expanded__activity__card'>
							<header className='expanded__activity__header'>
								<h3>{title}</h3>
								<h4 className='subtext'>Title</h4>
							</header>
							<article className='activity__card__text'>
								<div>
									<p className='activity__text'>
										{description}
									</p>
									<p className='sub_p'>
										Description
									</p>
								</div>
								<div>
									<p className='activity__text'>
										{zip_code}
									</p>
									<p className='sub_p'>Zip Code</p>
								</div>
								<div>
									<p className='activity__text'>
										{sTime}
									</p>
									<p className='sub_p'>
										Start Time
									</p>
								</div>
								<div>
									<p className='activity__text'>
										{eTime}
									</p>
									<p className='sub_p'>End Time</p>
								</div>
							</article>
							<div className='expanded__activity__btn__ctn'>
								<button
									onClick={() =>
										handleToggle((prev) => !prev)
									}
								>
									Cancel
								</button>
								<button>Something</button>
								<ActivityRequestsList
									requests={[...requests]}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
