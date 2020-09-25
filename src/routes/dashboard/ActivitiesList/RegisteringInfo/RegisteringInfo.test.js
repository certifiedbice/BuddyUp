import React from 'react'

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

// make the Landing component available
import RegisteringInfo from './RegisteringInfo'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
// this is the test case
it('renders without crashing', () => {
	// first create a DOM element to render the component into
	const div = document.createElement('div')

	// render the component, this is the actual test, if something is wrong it will fail here
	ReactDOM.render(
		<Router>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<RegisteringInfo />
			</MuiPickersUtilsProvider>
		</Router>,
		div
	)

	// clean up code
	ReactDOM.unmountComponentAtNode(div)
})
