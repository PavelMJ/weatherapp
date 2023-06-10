import React, { useState } from 'react'
import WeatherInfo from './WeatherInfo'


export default function Home({ currentData, fiveDaysData, getCityName,status, changeStatus }) {
	const [name, setName] = useState('')
	// console.log(currentData);


	return (
		<div className='Home'>
			<div className='input-panel'>
				<input className='search-input' type="text" placeholder='Lockation' onChange={(e) => { setName(e.target.value) }} value={name} />
				<button className='search-btn' onClick={() => {
					getCityName(name);
					setName('')
				}} >Search</button>
			</div>

			<div className='MainInfo'>
				<WeatherInfo currentData={currentData} />
				<button className='add-to-favorite' onClick={()=>{
					changeStatus()
					}}>{status}</button>
			</div>
			<div className='forcasts'>
				{fiveDaysData.map((day, index) => {
					return <div className='day' key={index}>
						<div className='day-conditions'>
							<div className='day-temp'>{`${day.temperature.toFixed(2)} ${day.unit}`}&deg;</div>
							<img src="img/cloud_sun_sunny_weather_icon.svg" alt="" width={'30px'} height={'auto'} />
						</div>
						<div className='day-of-week'>{day.day}</div>
					</div>
				})}
			</div>
		</div>
	)
}
