import React from 'react';
import SubmitButton from '../../components/form/SubmitButton';

export default function Register() {
	return (
		<>
			<header className='header'>
				<h1>BuddyUp</h1>
				<p>Welcome to BuddyUp! Log in to find your next buddy!</p>
			</header>
			<div className='login__container'>
				<form className='login__form'>
					<input aria-label='Name' placeholder='Name' />

					<input aria-label='Username' placeholder='Username' />
					<input aria-label='Password' placeholder='Password' />
					<input aria-label='Confirm Password' placeholder='Confirm Password' />
					<input
						aria-label='Zip Code'
						placeholder='Zip Code -- this is used to filter your results!'
					/>
					<SubmitButton arial-label='Register' type='button' text='REGISTER' />
				</form>
			</div>
		</>
	);
}
