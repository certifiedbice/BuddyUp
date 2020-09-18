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
	let sDate = s.toLocaleDateString()
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
			<div className='activity__list__item'>
				<li onClick={() => handleToggle((prev) => !prev)}>
					<h2>{title}</h2>
				</li>
			</div>
			{toggle && (
				<div className='account__modal'>
					<div className='expanded__activity'>
						<div className=' expanded__activity__card'>
							<header className='expanded__activity__header'>
								<h3>{title}</h3>
								<h4 className='subtext'>Title</h4>
							</header>
							<article className='activity__card__text'>
								<div>
									<p className='activity__text'>
										{description}
									</p>
									<p className='sub_p'>
										Description
									</p>
								</div>
								<div>
									<p className='activity__text'>
										{zip_code}
									</p>
									<p className='sub_p'>Zip Code</p>
								</div>
								<div>
									<p className='activity__text'>
										{sTime}
									</p>
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
