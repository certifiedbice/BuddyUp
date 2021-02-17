import React, { useContext, useState } from 'react'
import useForm from '../../hooks/useForm'
import SubmitButton from '../../components/form/SubmitButton'
import Input from '../../components/form/Input'
import { Link, useHistory } from 'react-router-dom'
import './Register.css'
import config from '../../config'
import TokenService from '../../services/token-service'
import { UserContext } from '../../context/UserContext'

export default function Register() {
	const history = useHistory()
	const [error, setError] = useState(null)
	const { setIsLogged } = useContext(UserContext)
	/**
	 * this component renders the registration form
	 * uses a custom form hook to process values.
	 * after successul post, save browser token and send user to '/dashboard'
	 */
	const { values, handleChange, reset } = useForm({
		name: '',
		username: '',
		password: '',
		password_2: '',
		zip_code: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		const {
			name,
			username,
			password,
			password_2,
			zip_code,
		} = values
		if (password !== password_2) {
			setError('Passwords do not match')
		} else if (password.split().join() === ' ') {
			setError('Passwords cannot be blank')
		} else if (zip_code.length !== 5 || isNaN(zip_code)) {
			setError('Zip Code must be a 5-digit number')
		} else {
			let user = {
				name,
				username,
				password,
				zip_code: parseInt(zip_code),
			}

			handleRegister(user)
			reset()
		}
	}
	const handleRegister = async (user) => {
		try {
			const response = await fetch(
				`${config.API_ENDPOINT}/users`,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(user),
				}
			)
			const data = await response.json()
			if (data.error) throw data.error
			const { authToken } = data.password
			const { saveAuthToken } = TokenService

			saveAuthToken(authToken)
			setIsLogged()
			history.push('/dashboard')
		} catch (error) {
			setError(error)
		}
	}
	return (
		<>
			<header className='header'>
				<h1>
					<Link to='/'>BuddyUp</Link>
				</h1>
				<p>
					Welcome to BuddyUp! Log in to find your next
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
							aria-label='Name'
							placeholder='Name'
							name='name'
							type='text'
							value={values.name}
							onChange={handleChange}
							required
						/>
						<Input
							aria-label='Username'
							placeholder='Username'
							name='username'
							type='text'
							value={values.username}
							onChange={handleChange}
							required
						/>
						<Input
							aria-label='Password'
							placeholder='Password'
							name='password'
							type='password'
							value={values.password}
							onChange={(e) => {
								handleChange(e)
								setError(null)
							}}
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

						<Input
							aria-label='Zip Code'
							placeholder='Zip Code'
							name='zip_code'
							value={values.zip_code}
							onChange={handleChange}
							required
						/>
					</div>
					<SubmitButton
						arial-label='Register'
						type='button'
						text='REGISTER'
						className='login__btn'
					/>
					<Link to='/login' className='signup-login'>
						Already have an account? Click here to log in
					</Link>
				</form>
			</div>
		</>
	)
}
