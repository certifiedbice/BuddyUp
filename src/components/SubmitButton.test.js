// make React available
import React from 'react';

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import toJson from 'enzyme-to-json';
// make the App component available
import  {SubmitButton} from './components/form/SubmitButton';

// this is the test case
it('sends data from user', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<SubmitButton />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});
export default SubmitButton