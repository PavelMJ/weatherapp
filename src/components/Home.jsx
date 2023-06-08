import React from 'react'

export default function Home() {
	return (
		<div className='Home'>
			<div className='input-panel'>
				<input className='search-input' type="text" placeholder='Lockation'/>
				<button className='search-btn'>Search</button>
			</div>
			<div className='city'>
				<div className='wether-info'>
					<div className='data'>
						<div className='temperature'>27 С	&deg;</div>
						<img src="img/cloud_sun_sunny_weather_icon.svg" alt="" />
						<div className='info'></div>
					</div>
					<div className='name-of-city'></div>
				</div>
				<button className='add-to-favorite'></button>
			</div>
			<div></div>


		</div>
	)
}
