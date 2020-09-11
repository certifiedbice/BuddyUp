import React from 'react';
import SubmitButton from '../../components/form/SubmitButton';
import Input from '../../components/form/Input';
import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router';
import './Register.css'

export default function Register() {
	return (
		<>
			<header className='header'>
				<h1>BuddyUp</h1>
				<p>Welcome to BuddyUp! Register or Log in to find your next buddy!</p>
			</header>
			<div className='login__container'>
				<form className='login__form'>
					<Input aria-label='Name' placeholder='Name' />
					<Input aria-label='Username' placeholder='Username' />
					<Input aria-label='Password' placeholder='Password' />
					<Input aria-label='Confirm Password' placeholder='Confirm Password' />
					<Input
						aria-label='Zip Code'
						placeholder='Zip Code -- this is used to filter your results!'
					/>
					<SubmitButton arial-label='Register' type='button' text='REGISTER' />
					<Link to='/login' class='signup-login'>Already have an account? Click here to log in</Link>
				</form>
			</div>
		</>
	);
}
