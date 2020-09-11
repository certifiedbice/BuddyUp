import React from 'react';
import { Link } from 'react-router-dom';

export default function Demo() {
	return (
		<>
			<div>Demo Landing Page</div>
			<button type='button'>
				<Link to='/register'>Go to BuddyUp</Link>
			</button>
		</>
	);
}
