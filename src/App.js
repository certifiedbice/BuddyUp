import React from 'react';
import './App.css';
import Login from './routes/login/Login';
import { Switch, Route } from 'react-router';
import Register from './routes/register/Register';
import Dashboard from './routes/dashboard/Dashboard';
import Landing from './routes/landing/Landing';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/dashboard' component={Dashboard} />
			</Switch>
		</div>
	);
}

export default App;
