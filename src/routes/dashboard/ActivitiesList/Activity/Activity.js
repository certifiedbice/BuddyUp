import React, { useState, useEffect } from 'react'
import config from '../../../../config'
import TokenService from '../../../../services/token-service'
import { useHistory } from 'react-router'
import ExpandedInfo from '../ExpandedInfo/ExpandedInfo'

export default function Activity({
	id,
	title,
	description,
	zip_code,
	start_time = '',
	end_time = '',
	user_id,
}) {
	const [expanded, setExpanded] = useState(false)
	const [registering, setRegistering] = useState(false)
	const [user, setUser] = useState({})
	const [error, setError] = useState(null)
	const history = useHistory()
	console.log(end_time)
	let s = new Date(start_time)
	let e = new Date(end_time)
	let date = s.toLocaleDateString()
	let sTime = s.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	let eTime = e.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	let times = {
		sTime,
		eTime,
	}
	const { name } = user

	async function register(data) {
		console.log(data)
		const response = await fetch(
			`${config.API_ENDPOINT}/signups`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${TokenService.getAuthToken()}`,
				},
				body: JSON.stringify(data),
			}
		)
		return response.json()
	}

	function handleSubmit(e) {
		e.preventDefault()
		const { contact_info } = e.target
		const data = {
			contact_info: contact_info.value,
			activity_id: id,
		}
		register(data).then(() => history.push('/account'))
	}

	const tooltipText =
		'Please provide contact information so this user may communicate with you if you are accepted.'

	const forRegister = {
		isRegistering: registering,
		tooltipText,
		actions: { setExpanded, setRegistering, handleSubmit },
	}

	let expandedInfo = (
		<ExpandedInfo
			{...forRegister}
			name={name}
			description={description}
			times={times}
			zip_code={zip_code}
			title={title}
		/>
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
			<li>
				<div
					className='event__item'
					onClick={() => setExpanded((exp) => !exp)}
				>
					<div className='date__container'>
						<h3>{date}</h3>
					</div>
					<div className='info__container'>
						<h4>{title}</h4>
					</div>
				</div>
			</li>
			{expanded && expandedInfo}
		</>
	)
}
