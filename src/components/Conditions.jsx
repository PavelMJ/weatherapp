import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Conditions({ item, KEY,setFromFavorites }) {
	
	const nav = useNavigate()
	const [favoritData, setFavoritData] = useState({})
	console.log(favoritData);
	const chooseCity=()=>{
		setFromFavorites(item.cityName)
		nav('/')
	}


	useEffect(() => {
		fetch(`/currentconditions/${item.cityKey}`)
			.then(res => res.json())
			.then(data => {
				
				if (data[0]) {
					let current = {
						ID: data.cityKey,
						cityName: data.cityName,
						WeatherText: data[0].WeatherText,
						Temperature: data[0].Temperature.Metric.Value
					}
					// const weatherData = JSON.stringify(current)
					// localStorage.setItem(`favorit-${data.cityName}`, weatherData)
					setFavoritData(prev => prev = current)
				}
				else {
					// const localData = localStorage.getItem(`favorit-${data.cityName}`)
					setFavoritData(prev => prev = item)
				}

			})
			.catch((err) => {
				console.log(err, 'favorit condition data error');
			})

	}, [])


	return (
		<div className='Condition' onClick={chooseCity}>
			<div className='favor-temp'>{favoritData.Temperature} C &deg;</div>
			<img src={`img/${favoritData.WeatherText}.svg`} alt="" width={'80px'} height={'auto'} />
			<div className='favor-name'>{favoritData.cityName}</div>

		</div>
	)
}
