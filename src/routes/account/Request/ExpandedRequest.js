import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

export default function ExpandedRequest({
	contact_info,
	handleToggle,
	title,
	...props
}) {
	console.log(props)
	const s = new Date(props.start_time)
	const e = new Date(props.end_time)
	let sTime = s.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	let eTime = e.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	return (
		<div className='account__modal'>
			<div className='expanded__request'>
				<header className='card__header'>
					<FaUserCircle className='icon user__icon' />
					<span>
						<p className='card__title'>{title}</p>
						<label>Title</label>
					</span>
					<span>
						<p className='card__title'>{props.name}</p>
						<label>Name</label>
					</span>
				</header>

				<div className='card__ctn'>
					<h2 className='card__title'>Host</h2>
					<div className='info__ctn'>
						<p className='card__info'>{props.username}</p>
						<label>Username</label>
					</div>
					<div className='info__ctn'>
						<p className='card__info'> {contact_info}</p>
						<label>Contact Info</label>
					</div>
					<div className='info__ctn'>
						<p className='card__info'>{props.zip_code}</p>
						<label>Zip Code</label>
					</div>
				</div>
				<div className='card__ctn'>
					<h2 className='card__title'>What</h2>
					<p className='card__info'>{props.description}</p>
				</div>
				<hr className='inset__divider' />
				<div className='card__ctn'>
					<h2 className='card__title'>
						Start and End Times
					</h2>
					<p className='card__info date'>
						{sTime} - {eTime}
					</p>
				</div>
				<div className='btn__ctn'>
					<button
						onClick={() => handleToggle((prev) => !prev)}
					>
						Back
					</button>
				</div>
			</div>
		</div>
	)
}
