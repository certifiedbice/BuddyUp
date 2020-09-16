import React, { Fragment, useState } from 'react'
import { DateTimePicker } from '@material-ui/pickers'

function BasicDateTimePicker() {
	const [selectedDate, handleDateChange] = useState(new Date())

	return (
		<Fragment>
			<DateTimePicker
				value={selectedDate}
				disablePast
				onChange={handleDateChange}
				label='With Today Button'
				showTodayButton
			/>
		</Fragment>
	)
}

export default BasicDateTimePicker
