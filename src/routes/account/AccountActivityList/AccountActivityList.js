import React from 'react'
import Activity from '../Activity/Activity'

export default function AccountActivityList({
	activities,
	...props
}) {
	return (
		<section className='account-activity__section'>
			<div className='account__section__flex'>
				<ul className='account-activity__list'>
					{activities &&
						activities.map((activity) => (
							<Activity
								key={`activity-${activity.id}`}
								{...activity}
							/>
						))}
				</ul>
			</div>
			<div className='account__modal'>
				<div className='expanded__activity'>HELLO</div>
			</div>
		</section>
	)
}
