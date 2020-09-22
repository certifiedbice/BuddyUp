import React, { useState } from 'react'
import config from '../../../config'
import TokenService from '../../../services/token-service'

export default function ActivitySignupItem({
	id = 8888,
	username = 'Username',
	user_id = 8888,
	contact_info = 'Contact Info',
	is_approved = false,
}) {
	const [isApproved, setIsApproved] = useState(is_approved)
	const [error, setError] = useState(null)

	async function handleToggle() {
		try {
			const Response = await fetch(
				`${config.API_ENDPOINT}/approval/${id}`,
				{
					method: 'PATCH',
					headers: {
						'content-type': 'application/json',
						authorization: `Bearer ${TokenService.getAuthToken()}`,
					},
				}
			)
			const data = await Response.json()
			if (data.error) throw data.error
			setIsApproved((prev) => !prev)
		} catch (error) {
			setError(error)
		}
	}

	return (
		<>
			<li
				className='activity__list__item'
				onClick={() => handleToggle((prev) => !prev)}
			>
				<h2>{username}</h2>
				<p>{contact_info}</p>
				<input
					typeof='checkbox'
					id='approval'
					name='approval'
					onChange={handleToggle}
					checked={isApproved}
				/>
				<label htmlFor='approval'>Accept user?</label>
			</li>
		</>
	)
}
