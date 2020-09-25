import React from 'react'
import Activity from '../Activity/Activity'

export default function AccountActivityList({
	activities,
	...props
}) {
	/**
	 * this component maps over  the activity list and returns the activity component as well as a frienly message if there are no activities
	 */
	return (
		<section className='account-activity__section'>
			{activities.length < 1 && (
				<p>
					You have not created any activities yet. Try
					making one using the "Add Activity" button in the
					top left!
				</p>
			)}

			<ul className='account-activity__list'>
				{activities.length > 0 && (
					<p>
						Click an activity below to see who has
						requested to join!
					</p>
				)}
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
