import React from 'react'
import ActivityRequestItem from '../ActivityRequestItem/ActivityRequestItem'

export default function ActivityRequestsList({ requests }) {
	return (
		<section className='user__select__section'>
			{requests.length < 1 && (
				<p>
					Nobody has requested to join this event. When
					someone does, they will show up here!
				</p>
			)}
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
