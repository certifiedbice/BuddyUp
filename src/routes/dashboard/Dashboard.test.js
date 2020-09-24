import { it } from 'date-fns/locale';
import React from 'react';
import Dashboard from './Dashboard';
import ReactDOM from "react-dom";
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme';

describe(`Dashboard component`, () => {
    it('should display the users dashboard component', ()=> {
        const wrapper = shallow(<Dashboard />)
        expect(toJson(wrapper)).toMatchSnapshot()

    })
})

it('renders the complete form', () => {
    const wrapper = shallow(<Dashboard />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
ReactDOM.unmountComponentAtNode('')
export default Dashboard