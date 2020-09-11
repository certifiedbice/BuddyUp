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
								<p>disco dancing with me</p>
							</div>
							<div className='info__button'>
								<button>INFO</button>
							</div>
						</div>

						<div className='event__item_expanded'>
							<p className='expanded__info'>
								<span className='info-bold'>
									Event Host:
								</span>{' '}
								David M.
							</p>
							<p className='expanded__info'>
								<span className='info-bold'>
									Location:
								</span>{' '}
								Inman Park
							</p>
							<p className='expanded__info'>
								<span className='info-bold'>
									Time:
								</span>{' '}
								4:15PM
							</p>
							<p className='expanded__info'>
								<span className='info-bold'>
									Notes:
								</span>{' '}
								Music requests are allowed
							</p>
						</div>
					</li>
					<li>
						<div className='event__item'>
							<div className='date__container'>
								<h3>9/11/2020</h3>
							</div>
							<div className='info__container'>
								<h5>Funeral</h5>
								<p>
									Come with me to my cousins'
									friend's uncle's funeral
								</p>
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
								<p>Description</p>
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
								<p>Description</p>
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
								<p>Description</p>
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
								<p>Description</p>
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
								<p>Description</p>
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
								<p>Description</p>
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
