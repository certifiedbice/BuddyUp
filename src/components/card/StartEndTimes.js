import React from 'react'

export default function StartEndTimes({ sTime, eTime }) {
	return (
		<div className='card__ctn'>
			<h2 className='card__title'>Start and End Times</h2>
			<p className='card__info date'>
				{sTime} - {eTime}
			</p>
		</div>
	)
}
