import React, { useState } from 'react'
import './Activity.css'

export default function Activity({
	description = 'Test event description 5',
	end_time = '2020-12-25T13:00:00.000Z',
	id = 5,
	start_time = '2020-12-25T12:00:00.000Z',
	title = 'Test Event 5',
	user_id = 6,
	zip_code = 12345,
}) {
	const [toggle, handleToggle] = useState(false)

	return (
		<>
			<div>
				<li onClick={() => handleToggle((prev) => !prev)}>
					{title} {description}
					{zip_code}
				</li>
			</div>
			{toggle && (
				<div className='account__modal'>
					<div
						className='expanded__activity'
						onClick={() => handleToggle((prev) => !prev)}
					>
						{title}
					</div>
				</div>
			)}
		</>
	)
}
