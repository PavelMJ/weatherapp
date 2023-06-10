import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Conditions({ data, KEY,setFromFavorites }) {
	const nav = useNavigate()
	const [favoritData, setFavoritData] = useState({})
	console.log(data);
	const chooseCity=()=>{
		setFromFavorites(data.cityKey)
		nav('/')
	}


	useEffect(() => {
		fetch(`http://localhost:4444/currentconditions/${data.cityKey}`)
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
					setFavoritData(prev => prev = data)
				}

			})
			.catch((err) => {
				console.log(err, 'favorit condition data error');
			}).finally(()=>{
				// const localData = localStorage.getItem(`favorit-${data.cityName}`)
					setFavoritData(prev => prev = data)
			})

	}, [])


	return (
		<div className='Condition' onClick={chooseCity}>
			<div className='favor-temp'>{favoritData.Temperature} C &deg;</div>
			<img src={`${favoritData.WeatherText}.svg`} alt="" width={'60px'} height={'auto'} />
			<div className='favor-name'>{favoritData.cityName}</div>

		</div>
	)
}
