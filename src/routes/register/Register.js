import React from 'react';
import SubmitButton from '../../components/form/SubmitButton';
import Input from '../../components/form/Input';
import { useRouteMatch } from 'react-router';
import useForm from '../../hooks/useForm';
import { Link } from 'react-router-dom';

export default function Register() {
	const { values, handleChange, reset } = useForm({
		name: '',
		username: '',
		password: '',
		password_2: '',
		zip_code: '',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
		reset();
	};
	return (
		<>
			<header className='header'>
				<h1>
					<Link to='/'>BuddyUp</Link>
				</h1>
				<p>Welcome to BuddyUp! Log in to find your next buddy!</p>
			</header>
			<div className='login__container'>
				<form className='login__form' onSubmit={handleSubmit}>
					<Input
						aria-label='Name'
						placeholder='Name'
						name='name'
						value={values.name}
						onChange={handleChange}
					/>
					<Input
						aria-label='Username'
						placeholder='Username'
						name='username'
						value={values.username}
						onChange={handleChange}
					/>
					<Input
						aria-label='Password'
						placeholder='Password'
						name='password'
						value={values.password}
						onChange={handleChange}
					/>
					<Input
						aria-label='Confirm Password'
						placeholder='Confirm Password'
						name='password_2'
						value={values.password_2}
						onChange={handleChange}
					/>
					<Input
						aria-label='Zip Code'
						placeholder='Zip Code -- this is used to filter your results!'
						name='zip_code'
						value={values.zip_code}
						onChange={handleChange}
					/>
					<SubmitButton arial-label='Register' text='REGISTER' />
				</form>
			</div>
		</>
	);
}
