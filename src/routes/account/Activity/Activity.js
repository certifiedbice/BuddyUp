import React, { useState, useEffect } from 'react'
import StartEndTimes from '../../../components/card/StartEndTimes'
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
}) {
	const [toggle, handleToggle] = useState(false)
	const [requests, setRequests] = useState([])
	const [error, setError] = useState(null)

	/**
	 * on mount of this component, fetch the activity requests to display on the expanded view
	 */
	useEffect(() => {
		const getActivityRequests = async () => {
			try {
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
				setRequests(data)
			} catch (error) {
				setError(error)
			}
		}
		if (!error) {
			getActivityRequests()
		}
		return () => {}
	}, [id, error, toggle])
	/**
	 * parse date objects to local time
	 */
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
	let times = {
		eTime,
		sTime,
	}

	return (
		<>
			<li
				className='activity__list__item'
				onClick={() => handleToggle((prev) => !prev)}
			>
				<div className='activity__list__item__text'>
					<div className='activity__list__item__header'>
						<span>
							<h2>{title}</h2>
							<label>Title</label>
						</span>
						<span>
							<p className='date__text'>{sTime}</p>
							<label>Start Time</label>
						</span>
					</div>
					<p className='description__text'>{description}</p>
				</div>
			</li>

			{toggle && (
				<div className='account__modal'>
					<div className='expanded__activity'>
						<div className=' expanded__activity__card'>
							<article className='activity__card__text'>
								<StartEndTimes {...times} />
							</article>
							<ActivityRequestsList
								requests={requests}
							/>
							<div className='act__btn__ctn'>
								<div className='act__btn'>
									<button
										onClick={() =>
											handleToggle(
												(prev) => !prev
											)
										}
									>
										Back
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
