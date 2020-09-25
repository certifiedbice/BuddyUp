import React, { useState, useEffect } from 'react'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import config from '../../../config'
import TokenService from '../../../services/token-service'
import ExpandedRequest from './ExpandedRequest'
import './Request.css'

export default function Request({
	user_name,
	activity_id,
	contact_info,
	is_approved,
}) {
	const [toggle, handleToggle] = useState(false)
	const [activity, setActivity] = useState({})
	const [user, setUser] = useState({})
	const [error, setError] = useState('')
	/**
	 * this component renders the users requested activites
	 * on mount it fetches the requests from the database
	 */
	const { title } = activity

	let { name } = user

	const icon = is_approved
		? () => {
				return <FaCheckCircle className='icon approved' />
		  }
		: () => {
				return <FaQuestionCircle className='icon pending' />
		  }

	const statusString = is_approved ? 'Approved!' : 'Pending...'

	useEffect(() => {
		const getActivity = async () => {
			try {
				const activityResponse = await fetch(
					`${config.API_ENDPOINT}/activities/${activity_id}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
					}
				)
				const activity = await activityResponse.json()
				if (activity.error) throw activity.error
				setActivity(activity)

				const { user_id } = activity

				const userResponse = await fetch(
					`${config.API_ENDPOINT}/users/${user_id}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
					}
				)
				const user = await userResponse.json()
				if (user.error) throw user.error
				setUser(user)
			} catch (error) {
				setError(error)
			}
		}
		if (!error) {
			getActivity()
		}
		return () => {}
	}, [activity_id, error])

	return (
		<>
			<li
				className='request__list__item'
				onClick={() => handleToggle((prev) => !prev)}
			>
				<div className='request__list__item__text'>
					<h2 className=''>{title} </h2>
					<p className=''>{name} </p>
				</div>

				<div className='icon__ctn'>
					{statusString} <span>{icon()}</span>
				</div>
			</li>

			{toggle && (
				<ExpandedRequest
					handleToggle={handleToggle}
					contact_info={contact_info}
					title={title}
					{...activity}
					{...user}
				/>
			)}
		</>
	)
}
