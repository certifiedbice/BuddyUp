import React, { useState } from 'react'

export default function NewActivity() {
	let today = new Date()
	let dString = today.toISOString().slice(0, 16)
	const [date, setDate] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()
		const { user_date } = e.target

		setDate({ date: user_date.value })

		let newDate = { date: user_date.value }
		console.log(e.target, newDate, date)
	}
	const handleChange = (e) => {
		setDate(e.target.value)
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					name='user_date'
					type='datetime-local'
					defaultValue={dString}
					onChange={handleChange}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}
