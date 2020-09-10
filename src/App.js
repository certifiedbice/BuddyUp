import React from 'react';
import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='header'>
				<h1>BuddyUp</h1>
				<p>Welcome back to BuddyUp! Log in to find your next buddy!</p>
			</header>
			<div className='login__container'>
				<form className='login__form'>
					<input aria-label='Username' placeholder='Username' />
					<input aria-label='Password' placeholder='Password' />
					<input
						aria-label='Confirm Password'
						placeholder='*Confirm Password -- conditionally render'
					/>
					<button arial-label='Login' type='button'>
						LOGIN
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
