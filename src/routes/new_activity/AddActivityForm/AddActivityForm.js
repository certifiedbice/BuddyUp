import React from 'react'
import Input from '../../../components/form/Input'
import './AddActivityForm.css'
/**
 *   title,
    description,
    zip_code: req.user.zip_code,
    user_id: req.user.id,
    start_time,
    end_time,
 */
export default function AddActivityForm() {
	return (
		<>
			<form className='activity__form'>
				<header>
					<legend>Enter Your Event Details Below</legend>
				</header>

				<div className='text__container'>
					<Input
						name='title'
						type='text'
						placeholder='Name of your event?'
						required
					/>
				</div>
				<div className='text__container'>
					<Input
						name='zip_code'
						type='text'
						placeholder='Zip Code'
						required
					/>
				</div>
				<div className='text__container'>
					<textarea
						name='description'
						type='text'
						placeholder='What is your event all about?'
						required
					/>
				</div>
				<div className='add__activity__btn__ctn'>
					<button
						type='submit'
						className='mui-btn mui-btn--raised'
					>
						Submit
					</button>
				</div>
			</form>
		</>
	)
}
