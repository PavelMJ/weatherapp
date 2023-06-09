import React from 'react'
import { Link } from 'react-router-dom'



export default function Header() {
	return (
		<div className='App-header' >
			<h2>Weathers</h2>
			<div className='nav-btns'>
				<Link to='/'><button className='header-btn'>Home</button></Link>
				<Link to='/favorites'><button className='header-btn'>Favorites</button></Link>
			</div>
		</div>
	)
}
