import React from 'react';
import './Login.css';
import Input from '../../components/form/Input';
import { Link, useRouteMatch } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import SubmitButton from '../../components/form/SubmitButton';

export default function Login() {
	const { values, handleChange, reset } = useForm({
		username: '',
		password: '',
		password_2: '',
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
				<p>Welcome back to BuddyUp! Log in to find your next buddy!</p>
			</header>
			<div className='login__container'>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='input__container'>
						<Input
							aria-label='Username'
							name='username'
							placeholder='Username'
							onChange={handleChange}
							value={values.username}
						/>
						<Input
							aria-label='Password'
							name='password'
							placeholder='Password'
							onChange={handleChange}
							value={values.password}
						/>
						{values.password && (
							<Input
								aria-label='Confirm Password'
								placeholder='Confirm Password'
								name='password_2'
								value={values.password_2}
								onChange={handleChange}
							/>
						)}
					</div>

					<SubmitButton arial-label='Login' text='LOGIN' />
				</form>
			</div>
		</>
	);
}
