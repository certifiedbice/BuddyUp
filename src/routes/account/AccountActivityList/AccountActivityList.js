import React from 'react'
import Activity from '../Activity/Activity'

export default function AccountActivityList({
	activities,
	...props
}) {
	console.log(activities)
	return (
		<section className='account-activity__section'>
			<ul className='account-activity__list'>
				{activities &&
					activities.map((activity) => (
						<Activity
							key={`activity-${activity.id}`}
							{...activity}
						/>
					))}
			</ul>
		</section>
	)
}
