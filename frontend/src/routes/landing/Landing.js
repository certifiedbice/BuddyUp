import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
	return (
		<div className='landing__container'>
			<h1 className='landing__header2'>Welcome To BuddyUp!</h1>
			<p className='landing__message'>
				BuddyUp is an application that allows you to organize
				and create activities in your area. Meet new friends
				while doing the activies you enjoy with BuddyUp! Click
				below to get started.
			</p>
			<button type='button'>
				<Link to='/register' id='start_btn'>
					Get Started!
				</Link>
			</button>
		</div>
	)
}
