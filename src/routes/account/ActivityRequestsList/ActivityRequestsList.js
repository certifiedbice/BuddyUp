import React from 'react'
import ActivityRequestItem from '../ActivityRequestItem/ActivityRequestItem'

export default function ActivityRequestsList({ requests }) {
	return (
		<section className='user__select__section'>
			{requests &&
				requests.map((request) => (
					<ActivityRequestItem
						key={`request-${request.id}`}
						{...request}
					/>
				))}
		</section>
	)
}
