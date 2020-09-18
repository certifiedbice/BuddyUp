import React from 'react'
import Request from '../Request/Request'

export default function AccountRequestList({ requests, ...props }) {
	return (
		<section className='account-activity__section'>
			<div className='account__section__flex'>
				<ul className='account-activity__list'>
					{requests &&
						requests.map((request) => (
							<Request
								key={`request-${request.id}`}
								{...request}
							/>
						))}
				</ul>
			</div>
		</section>
	)
}
