import React from 'react'
import ActivityRequestItem from '../ActivityRequestItem/ActivityRequestItem'

export default function ActivityRequestsList(props) {
	console.log(props.requests)
	return (
		<section className='user__select__section'>
			{props.requests &&
				props.requests.map((request) => (
					<ActivityRequestItem
						key={`request-${request.id}`}
						{...request}
					/>
				))}
		</section>
	)
}
