import React from 'react'
import useForm from '../../hooks/useForm'
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
		<div>
			<form id='date__form' onSubmit={handleSubmit}>
				<input
					name='date'
					type='datetime-local'
					defaultValue={values.date}
					onChange={handleChange}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}
