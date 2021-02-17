import React from 'react'
import Request from '../Request/Request'

export default function AccountRequestList({ requests, ...props }) {
	/**
	 * this component maps over the user's requests and renders the user's pending or accepted requests
	 */
	return (
		<section className='account-activity__section'>
			{requests.length < 1 && (
				<p>
					You have not requested to join any activities yet.
					Click the "Home" button at the top of the page to
					see a list of activities in your ZIP code. Try
					joining one!
				</p>
			)}
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
