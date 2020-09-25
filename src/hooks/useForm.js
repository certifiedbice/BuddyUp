import { useState } from 'react'
/**
 *
 * @param {object} initialValues - values from a form target object
 *
 * this small hook helps to contain all form inputs in a single function, which allows for reusability across the app
 */

export default function useForm(initialValues) {
	const [values, setValues] = useState(initialValues)
	return {
		values,
		handleChange: (e) => {
			setValues({
				...values,
				[e.target.name]: e.target.value,
			})
		},
		reset: () => setValues(initialValues),
	}
}
