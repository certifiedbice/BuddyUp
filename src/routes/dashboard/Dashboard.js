import React from 'react'
import './Dashboard.css'

export default function Dashboard() {
	return (
		<main>
			<header className='dashboard__header'>
				<h1>BuddyUp</h1>
				<h2>Find or create your next event</h2>
				<div>x number of events in your area</div>
			</header>
			<section className='event__section'>
				<ul className='event__list'>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Swing</h5>
								<h6>disco dancing with me</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Funeral</h5>
								<h6>
									Come with me to my cousins'
									friend's uncle's funeral
								</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Title</h5>
								<h6>Description</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Title</h5>
								<h6>Description</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Title</h5>
								<h6>Description</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Title</h5>
								<h6>Description</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Title</h5>
								<h6>Description</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Title</h5>
								<h6>Description</h6>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>
					</li>
				</ul>
			</section>
		</main>
	)
}
