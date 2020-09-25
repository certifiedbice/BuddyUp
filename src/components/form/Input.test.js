import React from 'react'

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, matchPath } from 'react-router-dom'

// make the Landing component available
import Input from './Input'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
// eslint-disable-next-line no-unused-vars
import { makeMaskFromFormat } from '@material-ui/pickers/_helpers/text-field-helper'
// this is the test case
it('renders without crashing', () => {
	// first create a DOM element to render the component into
	const div = document.createElement('div')

	// render the component, this is the actual test, if something is wrong it will fail here
	ReactDOM.render(
		<Router>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Input />
			</MuiPickersUtilsProvider>
		</Router>,
		div
	)

	// clean up code
	ReactDOM.unmountComponentAtNode(div)
})
Input.proptypesr={
    params:  matchPath

}