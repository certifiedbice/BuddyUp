import { useState } from 'react'

export default function useForm(initialValues) {
	const [values, setValues] = useState(initialValues)
	const [formError, setFormError] = useState(null)
	return {
		values,
		formError,
		handleChange: (e) => {
			setValues({
				...values,
				[e.target.name]: e.target.value,
			})
		},
		reset: () => setValues(initialValues),
		passwordValidation: () =>
			setFormError('Passwords do not match'),
	}
}
