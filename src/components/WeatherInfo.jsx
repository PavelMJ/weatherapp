import React from 'react'

export default function WeatherInfo({currentData}) {
	return (
		<div className='WeatherInfo'>
		<div className='data'>
			<div className='temperature'>{currentData.Temperature} C	&deg;</div>
			<div className='name-of-city'>{currentData.cityName}</div>
		</div>
		<div className='data'>
			<img src="img/cloud_sun_sunny_weather_icon.svg" alt="info-icon" />
			<div className='info'>{currentData.WeatherText}</div>
		</div>
	</div>
	)
}
