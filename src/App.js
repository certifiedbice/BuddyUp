import React from 'react'
import './App.css'
import Login from './routes/login/Login'
import { Switch, Route } from 'react-router'
import Register from './routes/register/Register'
import Dashboard from './routes/dashboard/Dashboard'
import Landing from './routes/landing/Landing'
import NewActivity from './routes/new_activity/NewActivity'
import Account from './routes/account/Account'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/new-activity' component={NewActivity} />
				<Route path='/account' component={Account} />
			</Switch>
		</div>
	)
}

export default App
