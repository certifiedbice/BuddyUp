import React, { useState } from 'react'

export default function Activity({
	title,
	description,
	zip_code,
	start_time = '',
}) {
	const [expanded, setExpanded] = useState(false)
	let d = new Date(start_time)
	let date = d.toLocaleDateString()
	let time = d.toLocaleTimeString()
	let expandedInfo = (
		<div className='event__item_expanded'>
			<p className='expanded__info'>
				<span className='info-bold'>Event Host:</span> David
				M.
			</p>
			<p className='expanded__info'>
				<span className='info-bold'>Location:</span>
				{zip_code}
			</p>
			<p className='expanded__info'>
				<span className='info-bold'>Time:</span> {time}
			</p>
			<p className='expanded__info'>
				<span className='info-bold'>Notes:</span> Music
				requests are allowed
			</p>
		</div>
	)
	return (
		<li>
			<div className='event__item'>
				<div className='date__container'>
					<h3>{date}</h3>
				</div>
				<div className='info__container'>
					<h5>{title}</h5>
					<p>{description}</p>
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
