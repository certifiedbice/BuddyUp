import React, { useState, useEffect } from 'react'
import config from '../../../../config'
import { FaInfoCircle, FaUserCircle } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import TokenService from '../../../../services/token-service'
import { useHistory } from 'react-router'

export default function Activity({
	id,
	title,
	description,
	zip_code,
	start_time = '',
	user_id,
}) {
	const [expanded, setExpanded] = useState(false)
	const [registering, setRegistering] = useState(false)
	const [user, setUser] = useState({})
	const [error, setError] = useState(null)
	const history = useHistory()

	let d = new Date(start_time)
	let date = d.toLocaleDateString()
	let time = d.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	let concat = description
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

	const registeringInfo = (
		<div className='expanded__info__btn__ctn'>
			<form
				onSubmit={handleSubmit}
				className='event__item_registering'
			>
				<label htmlFor='contact_info'>
					CONTACT INFO
					<sup
						data-tip={tooltipText}
						className='registering__superscript'
					>
						<FaInfoCircle />
					</sup>
					<ReactTooltip />
				</label>
				<input
					className='registering__input'
					typeof='text'
					name='contact_info'
					placeholder='ex: "Whatsapp: YourInfo"'
				/>
				<button typeof='submit'>SUBMIT</button>
			</form>
		</div>
	)

	let expandedInfo = (
		<div className='modal'>
			<div className='event__item_expanded'>
				<div className='expanded__info'>
					<header>
						<div className='expanded__header'>
							<FaUserCircle className='avatar__icon' />
							<div className='expanded__header__text'>
								<p>{name}</p>
								<h5 className='info-bold'>
									Event Host
								</h5>
							</div>
						</div>
					</header>
				</div>
				<article>
					<div className='expanded__info'>
						<h5 className='info-bold'>Time</h5>
						<p>{time}</p>
					</div>
					<div className='expanded__info'>
						<h5 className='info-bold'>Zip Code</h5>
						<p>{zip_code}</p>
					</div>
					<div className='expanded__info'>
						<h5 className='info-bold'>Note</h5>
						<p>{description}</p>
					</div>
				</article>

				{!registering && (
					<div className='expanded__info__btn__ctn'>
						<button
							type='button'
							onClick={() => setExpanded((exp) => !exp)}
						>
							BACK
						</button>

						<button
							type='button'
							onClick={() =>
								setRegistering((reg) => !reg)
							}
						>
							SIGN UP
						</button>
					</div>
				)}

				{registering && registeringInfo}
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
						<p>{`${concat.slice(0, 12)}...`}</p>
					</div>
				</div>
			</li>
			{expanded && expandedInfo}
		</>
	)
}
