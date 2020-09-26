import React, { useContext, useState } from 'react'
import './Login.css'
import Input from '../../components/form/Input'
import { Link, useHistory } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import SubmitButton from '../../components/form/SubmitButton'
import config from '../../config'
import TokenService from '../../services/token-service'
import { UserContext } from '../../context/UserContext'

export default function Login() {
	const [error, setError] = useState(null)
	const history = useHistory()
	const { setIsLogged } = useContext(UserContext)
	/**
	 * This component renders the login form as well as a header
	 * after sucessful login, set browser token, set context to 'true' and send user to '/dashboard'
	 */
	const { values, handleChange, reset } = useForm({
		username: '',
		password: '',
		password_2: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		const { username, password, password_2 } = values
		if (password !== password_2) {
			setError('Passwords do not match')
		} else if (password.split().join() === ' ') {
			setError('Passwords cannot be blank')
		} else {
			handleLogin({ username, password })
			reset()
		}
	}

	const handleLogin = async (user) => {
		try {
			const response = await fetch(
				`${config.API_ENDPOINT}/auth/login`,
				{
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify(user),
				}
			)
			/**
			 * after fetch, save token and set context to 'true', send user to '/dashboard'
			 */
			const data = await response.json()
			if(data.error) throw data.error
			TokenService.saveAuthToken(data.authToken)
			setIsLogged()
			history.push('/dashboard')
		} catch (error) {
			setError(error)
		}
	}

	return (
		<>
			<header className='header'>
				<h1>BuddyUp</h1>
				<p>
					Welcome back to BuddyUp! Log in to find your next
					buddy!
				</p>
			</header>
			<div className='login__container'>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='input__container'>
						{error && (
							<div className='error__'>{error}</div>
						)}
						<Input
							aria-label='Username'
							name='username'
							type='text'
							placeholder='Username'
							onChange={handleChange}
							value={values.username}
							required
						/>
						<Input
							aria-label='Password'
							name='password'
							type='password'
							placeholder='Password'
							onChange={(e) => {
								handleChange(e)
								setError(null)
							}}
							value={values.password}
							required
						/>
						{values.password && (
							<Input
								aria-label='Confirm Password'
								placeholder='Confirm Password'
								name='password_2'
								type='password'
								value={values.password_2}
								onChange={(e) => {
									handleChange(e)
									setError(null)
								}}
								required
							/>
						)}
					</div>

					<SubmitButton
						arial-label='Login'
						text='LOGIN'
						className='login__btn'
					/>
					<Link to='/register' className='signup-login'>
						No Account? Sign up now
					</Link>
				</form>
			</div>
		</>
	)
}
