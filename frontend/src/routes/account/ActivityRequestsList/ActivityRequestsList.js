import React from 'react'
import ActivityRequestItem from '../ActivityRequestItem/ActivityRequestItem'

export default function ActivityRequestsList({ requests }) {
	/**
	 * this component renders the user's pending or accepted activity requests, as well as a frendly message if the user does not have any pending or accepted requests
	 */
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
