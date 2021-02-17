import React from 'react'

export default function ExpandedRequest({
	contact_info,
	handleToggle,
	title,
	...props
}) {
	/**
	 * this component returns a detailed card view of the requested activity in a custom css modal
	 */
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
					<div>
						<span>
							<p className='card__title'>{title}</p>
							<label>Title</label>
						</span>
						<span>
							<p className='card__title'>
								{props.name}
							</p>
							<label>Name</label>
						</span>
					</div>
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
				<div className='req__btn__ctn'>
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
