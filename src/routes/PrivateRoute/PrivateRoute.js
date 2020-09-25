import React, { useContext, useState } from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../../context/UserContext'

export default function PrivateRoute({ component, ...props }) {
	const Component = component
	const [context] = useState(useContext(UserContext))
	return (
		<Route
			{...props}
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
