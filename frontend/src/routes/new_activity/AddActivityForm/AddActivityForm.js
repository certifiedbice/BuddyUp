import React, { useState } from 'react'
import Input from '../../../components/form/Input'
import { DatePicker, TimePicker } from '@material-ui/pickers'
import './AddActivityForm.css'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import config from '../../../config'
import TokenService from '../../../services/token-service'
import { useHistory } from 'react-router'
import { blue } from '@material-ui/core/colors'

export default function AddActivityForm() {
	const history = useHistory()
	/**
	 * set state variables as current date object - placeholder form date/time picker
	 */
	const [selectedDate, handleDateChange] = useState(new Date())
	const [startTime, handleStartTimeChange] = useState(new Date())
	const [endTime, handleEndTimeChange] = useState(new Date())
	const [error, setError] = useState(null)
	/**
	 * set theme for date/time picker to match 'blue A700'
	 */
	const materialTheme = createMuiTheme({
		palette: {
			primary: { main: blue['A700'] },
		},
	})

	const addActivity = async (newActivity) => {
		try {
			const res = await fetch(
				`${config.API_ENDPOINT}/activities`,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						authorization: `bearer ${TokenService.getAuthToken()}`,
					},
					body: JSON.stringify(newActivity),
				}
			)
			const data = await res.json()
			if (data.error) throw data.error
			/**
			 * send user to '/dashboard' after successful post
			 */
			history.push('/dashboard')
		} catch (error) {
			setError(error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { title, description } = e.target
		const newActivity = {
			title: title.value,
			description: description.value,
			start_time: startTime.toJSON(),
			end_time: endTime.toJSON(),
		}
		addActivity(newActivity)
	}

	return (
		<>
			<form className='activity__form' onSubmit={handleSubmit}>
				<header>
					<legend>Enter Your Event Details Below</legend>
					{error && (
						<p syle={{ color: 'red' }}>{error.message}</p>
					)}
				</header>
				<ThemeProvider theme={materialTheme}>
					<div className='add__activity__date'>
						<DatePicker
							id='DatePicker'
							label='Select Date'
							value={selectedDate}
							onChange={handleDateChange}
							animateYearScrolling
						/>
						<TimePicker
							id='StartTimePicker'
							label='Start Time'
							value={startTime}
							onChange={handleStartTimeChange}
						/>
						<TimePicker
							id='EndTimePicker'
							autoOk
							label='End Time'
							value={endTime}
							onChange={handleEndTimeChange}
						/>
					</div>
				</ThemeProvider>
				<div className='text__container'>
					<Input
						name='title'
						aria-label='Title'
						type='text'
						placeholder='Name of your event?'
						required
					/>
				</div>

				<div className='text__container'>
					<textarea
						name='description'
						aria-label='Description'
						type='text'
						placeholder='What is your event all about?'
						required
					/>
				</div>
				<div className='expanded__info__btn__ctn register__btn__ctn'>
					<button
						type='button'
						onClick={() => history.goBack()}
					>
						Go Back
					</button>
					<button type='submit'>Submit</button>
				</div>

				<div className='add__activity__btn__ctn'></div>
			</form>
		</>
	)
}
