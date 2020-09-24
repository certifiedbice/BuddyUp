import React, { useState } from 'react'
import config from '../../../config'
import TokenService from '../../../services/token-service'
import './ActivityRequestItem.css'

export default function ActivityRequestItem({
	id = 8888,
	user_name = 'Username',
	contact_info = 'Contact Info',
	is_approved = false,
}) {
	const [isApproved, setIsApproved] = useState(is_approved)
	const [error, setError] = useState(null)
	console.log(isApproved)

	async function handleToggle() {
		try {
			const Response = await fetch(
				`${config.API_ENDPOINT}/signups/approval/${id}`,
				{
					method: 'PATCH',
					headers: {
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
		<div className='user__select__ctn'>
			<div className='user__select__info'>
				<span className='user__select__text__ctn'>
					<p>{user_name}</p>
					<label>Username</label>
				</span>
				<span className='user__select__text__ctn'>
					<p>{contact_info}</p>
					<label>Contact</label>
				</span>
			</div>
			<div className='user__select__controls'>
				<form aria-label='Approve User Form'>
					<label className='switch'>
						<input
							type='checkbox'
							name='approval'
							aria-label='Approve User'
							onChange={handleToggle}
							defaultChecked={isApproved}
						/>
						<span className='slider round'></span>
					</label>
				</form>

				<label className='input__label'>Accept user?</label>
			</div>
		</div>
	)
}
