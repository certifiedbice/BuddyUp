import React from 'react'
import Request from '../Request/Request'

export default function AccountRequestList({ requests, ...props }) {
	return (
		<section className='account-activity__section'>
			<ul className='request-activity__list'>
				{requests &&
					requests.map((request) => (
						<Request
							key={`request-${request.id}`}
							{...request}
						/>
					))}
			</ul>
		</section>
	)
}
