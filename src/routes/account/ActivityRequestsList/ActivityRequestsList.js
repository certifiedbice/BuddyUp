import React from 'react'
import ActivityRequestItem from '../ActivityRequestItem/ActivityRequestItem'

export default function ActivityrequestsList(requests, ...props) {
	return (
		<ul>
			{requests &&
				requests.map((request) => (
					<ActivityRequestItem
						key={`request-${request.id}`}
						{...request}
					/>
				))}
		</ul>
	)
}
