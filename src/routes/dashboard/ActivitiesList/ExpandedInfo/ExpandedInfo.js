import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import StartEndTimes from '../../../../components/card/StartEndTimes'

import RegisteringInfo from '../RegisteringInfo/RegisteringInfo'

export default function ExpandedInfo({
	actions,
	isRegistering,
	name,
	zip_code,
	times,
	description,
	tooltipText,
}) {
	return (
		<div className='modal'>
			<div className='expanded__info'>
				<header>
					<div className='expanded__header'>
						<FaUserCircle className='avatar__icon' />
						<div className='expanded__header__text'>
							<h3>{name}</h3>
							<label className='info-bold'>
								Event Host
							</label>
						</div>
					</div>
				</header>

				<article>
					<div className='expanded__info__text'>
						<StartEndTimes {...times} />
					</div>
					<hr className='inset__divider' />
					<div className='expanded__info__text'>
						<h5 className='info-bold'>{zip_code}</h5>
						<label>Zip Code</label>
					</div>
					<div className='expanded__info__text'>
						<h5 className='info-bold'>Note</h5>
						<p>{description}</p>
					</div>

					{!isRegistering && (
						<div className='expanded__info__btn__ctn '>
							<button
								type='button'
								onClick={() =>
									actions.setExpanded((exp) => !exp)
								}
							>
								BACK
							</button>
							<button
								type='button'
								onClick={() =>
									actions.setRegistering(
										(reg) => !reg
									)
								}
							>
								SIGN UP
							</button>
						</div>
					)}

					{isRegistering && (
						<RegisteringInfo
							{...actions}
							tooltipText={tooltipText}
						/>
					)}
				</article>
			</div>
		</div>
	)
}
