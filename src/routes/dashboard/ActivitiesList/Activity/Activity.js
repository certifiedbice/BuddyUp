import React, { useState, useEffect } from 'react'
import config from '../../../../config'

export default function Activity({
	title,
	description,
	zip_code,
	start_time = '',
	user_id,
}) {
	const [expanded, setExpanded] = useState(false)
	const [user, setUser] = useState({})
	const [error, setError] = useState(null)

	let d = new Date(start_time)
	let date = d.toLocaleDateString()
	let time = d.toLocaleTimeString()
	let concat = description
	const { name } = user
	let expandedInfo = (
		<div className='event__item_expanded'>
			<p className='expanded__info'>
				<span className='info-bold'>Event Host:</span> {name}
			</p>
			<p className='expanded__info'>
				<span className='info-bold'>Location:</span>
				{zip_code}
			</p>
			<p className='expanded__info'>
				<span className='info-bold'>Time:</span> {time}
			</p>
			<p className='expanded__info'>
				<span className='info-bold'>Notes:</span>{' '}
				{description}
			</p>
		</div>
	)

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetch(
					`${config.API_ENDPOINT}/users/${user_id}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json',
						},
					}
				)
				const user = await response.json()
				if (user.error) throw user.error
				setUser(user)
			} catch (error) {
				setError(error)
			}
		}
		!error && getUser()
		return () => {}
	}, [user_id, error])

	return (
		<li>
			<div className='event__item'>
				<div className='date__container'>
					<h3>{date}</h3>
				</div>
				<div className='info__container'>
					<h5>{title}</h5>
					<p>{`${concat.slice(0, 8)}...`}</p>
				</div>
				<div className='info__button'>
					<button
						onClick={() => setExpanded((exp) => !exp)}
					>
						INFO
					</button>
				</div>
			</div>
			{expanded && expandedInfo}
		</li>
	)
}
