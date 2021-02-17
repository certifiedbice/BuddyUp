import React, { useContext, useState } from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../../context/UserContext'

export default function PrivateRoute({ component, ...props }) {
	const Component = component
	/**
	 * context saved as a state variable - will re render if varaible changes
	 *
	 */

	const [context] = useState(useContext(UserContext))
	return (
		<Route
			{...props}
			/**
			 * useContext hook to avoid more nested functions.
			 * if conext for isLogged is false, will redirect to '/register'
			 */
			render={(componentProps) =>
				context.isLogged ? (
					<Component {...componentProps} />
				) : (
					<Redirect
						to={{
							pathname: '/register',
							state: {
								from: componentProps.location,
							},
						}}
					/>
				)
			}
		/>
	)
}
