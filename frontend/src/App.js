import React, { useContext, useState } from 'react'
import './App.css'
import Login from './routes/login/Login'
import { Switch, Route } from 'react-router'
import Register from './routes/register/Register'
import Dashboard from './routes/dashboard/Dashboard'
import Landing from './routes/landing/Landing'
import NewActivity from './routes/new_activity/NewActivity'
import Account from './routes/account/Account'
import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import { UserContext } from './context/UserContext'

function App() {
	/**
	 *  will render if state variable ischanged
	 */
	const [isLogged] = useState(useContext(UserContext))
	/**
	 * This component returns all views in the app
	 */
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<UserContext.Provider value={isLogged}>
					<PrivateRoute
						path={'/dashboard'}
						component={Dashboard}
					/>
					<PrivateRoute
						path={'/new-activity'}
						component={NewActivity}
					/>
					<PrivateRoute
						path={'/account'}
						component={Account}
					/>
				</UserContext.Provider>
			</Switch>
		</div>
	)
}

export default App
