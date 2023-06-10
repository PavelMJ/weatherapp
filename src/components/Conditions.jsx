import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Conditions({ cityKey, cityName, KEY,setFromFavorites,  }) {
	const nav = useNavigate()
	const [favoritData, setFavoritData] = useState({})
	const chooseCity=()=>{
		setFromFavorites(cityKey)
		nav('/')
	}


	useEffect(() => {
		fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${KEY}`)
			.then(res => res.json())
			.then(data => {

				if (data) {
					let current = {
						ID: cityKey,
						cityName,
						WeatherText: data[0].WeatherText,
						Temperature: data[0].Temperature.Metric.Value
					}
					const weatherData = JSON.stringify(current)
					localStorage.setItem(`favorit-${cityName}`, weatherData)
					setFavoritData(prev => prev = current)
				}
				else {
					const localData = localStorage.getItem(`favorit-${cityName}`)
					setFavoritData(prev => prev = localData)
				}

			})
			.catch((err) => {
				console.log(err, 'favorit condition data error');
			})

	}, [])


	return (
		<div className='Condition' onClick={chooseCity}>
			<div className='favor-temp'>{favoritData.Temperature} C &deg;</div>
			<img src="img/cloud_sun_sunny_weather_icon.svg" alt="" width={'60px'} height={'auto'} />
			<div className='favor-name'>{favoritData.cityName}</div>

		</div>
	)
}
