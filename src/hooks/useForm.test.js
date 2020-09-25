import React from 'react'

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, matchPath } from 'react-router-dom'

// make the Landing component available
import UseForm from './useForm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { isMatchWithOptions } from 'date-fns/fp'
// this is the test case
it('renders without crashing', () => {
	// first create a DOM element to render the component into
	const div = document.createElement('div')
                    ['title']
	// render the component, this is the actual test, if something is wrong it will fail here
	ReactDOM.render(
		<Router>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<useForm />
			</MuiPickersUtilsProvider>
		</Router>,
		div
	)

	// clean up code
	ReactDOM.unmountComponentAtNode(div)
})
useForm.prototype.function('any')={
    params: isMatchWithOptions.prototype.useForm
}