import React, { useState } from 'react'

export default function Home({ currentData, fiveDaysData, getCityName }) {
	const [name, setName] = useState('')

	return (
		<div className='Home'>
			<div className='input-panel'>
				<input className='search-input' type="text" placeholder='Lockation' onChange={(e) => { setName(e.target.value) }} value={name} />
				<button className='search-btn' onClick={() => {
					getCityName(name);
					setName('')
				}} >Search</button>
			</div>
			<div className='city'>
				<div className='wether-info'>
					<div className='data'>
						<div className='temperature'>{currentData.Temperature} C	&deg;</div>
						<img src="img/cloud_sun_sunny_weather_icon.svg" alt="info-icon" />
						<div className='info'>{currentData.WeatherText}</div>
					</div>

					<div className='name-of-city'>{currentData.cityName}</div>
				</div>
				<button className='add-to-favorite'>add to favorite</button>
			</div>
			<div className='forcasts'>
				{fiveDaysData.map((day)=>{
					return <div className='day'></div>
				})}
			</div>


		</div>
	)
}
