import React from 'react'

export default function SubmitButton(props) {
	return (
		<button {...props} type='submit'>
			{props.text && props.text}
		</button>
	)
}
