import React from 'react';
import './App.css';
import Login from './routes/login/Login';
import { Switch, Route } from 'react-router';
import Register from './routes/register/Register';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
			</Switch>
		</div>
	);
}

export default App;
