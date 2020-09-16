import React from 'react'
import useForm from '../../hooks/useForm'
import AddActivityForm from './AddActivityForm/AddActivityForm'
import './NewActivity.css'

export default function NewActivity() {
	let today = new Date()

	let dString = `${today
		.toISOString()
		.slice(0, 10)}T${today.toTimeString().slice(0, 5)}`

	const { handleChange, values } = useForm({ date: dString })
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(values, {
			date: values.date + ':00.000Z',
		})
	}

	return (
		<main>
			<header className='dashboard__header'>
				<div className='header__text'>
					<h1>BuddyUp</h1>
					<h2>Find or create your next event</h2>
				</div>
			</header>
			<section className='event__section'>
				<AddActivityForm />
				<form id='date__form' onSubmit={handleSubmit}>
					<input
						name='date'
						type='datetime-local'
						defaultValue={values.date}
						onChange={handleChange}
					/>
					<button type='submit'>Submit</button>
				</form>
			</section>
		</main>
	)
}
