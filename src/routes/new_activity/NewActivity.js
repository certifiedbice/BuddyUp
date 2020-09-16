import React from 'react'
import AddActivityForm from './AddActivityForm/AddActivityForm'
import './NewActivity.css'

export default function NewActivity() {
	return (
		<main>
			<header className='dashboard__header'>
				<div className='header__text'>
					<h1>BuddyUp</h1>
					<h2>Find or create your next event</h2>
				</div>
			</header>
			<section className='event__section'>
				<AddActivityForm />
			</section>
		</main>
	)
}
