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
		<div className='modal'>
			<div
				className='event__item_expanded'
				onClick={() => setExpanded((exp) => !exp)}
			>
				<div className='expanded__info'>
					<h5 className='info-bold'>Event Host:</h5>
					<p>{name}</p>
				</div>
				<div className='expanded__info'>
					<h5 className='info-bold'>Zip Code:</h5>
					<p>{zip_code}</p>
				</div>
				<div className='expanded__info'>
					<h5 className='info-bold'>Time:</h5> <p>{time}</p>
				</div>
				<div className='expanded__info'>
					<h5 className='info-bold'>Notes:</h5>
					<p>{description}</p>
				</div>
			</div>
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
		<>
			<li onClick={() => setExpanded((exp) => !exp)}>
				<div className='event__item'>
					<div className='date__container'>
						<h3>{date}</h3>
					</div>
					<div className='info__container'>
						<h4>{title}</h4>
						<p>{`${concat.slice(0, 12)}...`}</p>
					</div>
					<div className='info__button'>
						<button>INFO</button>
					</div>
				</div>
			</li>
			{expanded && expandedInfo}
		</>
	)
}
