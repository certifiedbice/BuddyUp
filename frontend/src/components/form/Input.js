import React from 'react'
import './Input.css'
export default function Input(props) {
	return (
		<input
			className='text__input'
			autoComplete='off'
			{...props}
		/>
	)
}
