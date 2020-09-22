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
	let s = new Date(start_time)
	let e = new Date(end_time)
	let sTime = s.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	let eTime = e.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<>
			<li
				className='activity__list__item'
				onClick={() => handleToggle((prev) => !prev)}
			>
				<div className='activity__list__item__text'>
					<div className='activity__list__item__header'>
						<span>
							<h2>{title}</h2>
							<label>Title</label>
						</span>
						<span>
							<p className='activity__text'>{sTime}</p>
							<label>Start Time</label>
						</span>
					</div>
					<p className='description__text'>{description}</p>
				</div>
			</li>

			{toggle && (
				<div className='account__modal'>
					<div className='expanded__activity'>
						<div className=' expanded__activity__card'>
							<article className='activity__card__text'>
								<div>
									<p className='sub_p'>Zip Code</p>
								</div>
								<div>
									<p className='sub_p'>
										Start Time
									</p>
								</div>
								<div>
									<p className='activity__text'>
										{eTime}
									</p>
									<p className='sub_p'>End Time</p>
								</div>
							</article>
							<div className='expanded__activity__btn__ctn'>
								<button
									onClick={() =>
										handleToggle((prev) => !prev)
									}
								>
									Cancel
								</button>
								<button>Something</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
