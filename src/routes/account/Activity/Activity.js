import React from 'react'

export default function Activity({
	description = 'Test event description 5',
	end_time = '2020-12-25T13:00:00.000Z',
	id = 5,
	start_time = '2020-12-25T12:00:00.000Z',
	title = 'Test Event 5',
	user_id = 6,
	zip_code = 12345,
}) {
	return (
		<div>
			<li>
				{title} {description}
				{zip_code}
			</li>
		</div>
	)
}
