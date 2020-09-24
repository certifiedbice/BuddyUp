import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'

export default function RegisteringInfo({
	handleSubmit,
	setExpanded,
	tooltipText,
	setRegistering,
}) {
	return (
		<form
			onSubmit={handleSubmit}
			className='event__item_registering'
		>
			<div className='expanded__info__btn__ctn register__btn__ctn'>
				<button
					type='button'
					onClick={() => setRegistering((exp) => !exp)}
				>
					BACK
				</button>
				<button typeof='submit'>SUBMIT</button>
			</div>
			<label className='registering' htmlFor='contact_info'>
				Contact Info
				<sup
					data-tip={tooltipText}
					className='registering__superscript'
				>
					<FaInfoCircle />
				</sup>
				<ReactTooltip />
			</label>
			<input
				className='registering__input'
				typeof='text'
				name='contact_info'
				placeholder='ex: "Whatsapp: YourInfo"'
			/>
		</form>
	)
}
