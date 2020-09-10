import React from 'react';
import './Login.css';
import Input from '../../components/form/Input';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Login() {
	return (
		<>
			<header className='header'>
				<h1>BuddyUp</h1>
				<p>Welcome back to BuddyUp! Log in to find your next buddy!</p>
			</header>
			<div className='login__container'>
				<form className='login__form'>
					<Input aria-label='Username' placeholder='Username' />
					<Input aria-label='Password' placeholder='Password' />
					<Input
						aria-label='Confirm Password'
						placeholder='*Confirm Password -- conditionally render'
					/>
					<button arial-label='Login' type='button'>
						LOGIN
					</button>
					<Link to='/register'>Already have an acount?</Link>
				</form>
			</div>
		</>
	);
}
