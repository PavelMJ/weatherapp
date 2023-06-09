
import './App.css';
import dateToDay from './utils/dayConverter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import { useEffect, useState } from 'react';


function App() {
	const KEY = 'Cyu1jaiubNmcSmDth7N9EgQA4Mh97c6v&q'

	const [city, setCity] = useState('tel aviv')
	const [cityKey, setCityKey] = useState('215793')
	const [currentData, setcurrentData] = useState({})
	const [fiveDaysData, setFivDaysData] = useState([])
	console.log(currentData);
	console.log(fiveDaysData);

	const [favorites, setFavorites]=useState([])
	const [status, setStatus]=useState('Add to Favorites')
	const [refresh, setRefresh]=useState(true)
	console.log(favorites);
	const showFavorites=()=>{
		setRefresh(!refresh)
	}




	const changeStatus=()=>{
		if(favorites.includes(currentData.ID)){
			setStatus("Add to Favorites")
			const filtred = favorites.filter(val => val != currentData.ID)
			setFavorites([...filtred])
			
		}
		else{
			setStatus("Remove from Favorites")
			setFavorites([...favorites, currentData.ID])
			
		}
	}

	const builForcast = (data) => {
		return data.DailyForecasts.map((details) => {
			return {
				day: dateToDay(details.Date),
				temperature: (details.Temperature.Minimum.Value + details.Temperature.Maximum.Value) / 2 ,
				unit: 'C',
				weatherText: details.Day.IconPhrase,
			}
		})
	}

	const getCityName = (name)=>{
		setCity(name)
	}

	useEffect(()=>{
		const data =localStorage.getItem('favoritData')
		if(data){
			const favoritData = JSON.parse(data)
			setFavorites([...favoritData])
		}
	},[])

	useEffect(()=>{
		const favoritData = JSON.stringify(favorites)
			localStorage.setItem('favoritData',favoritData)
	},[favorites])



	useEffect(() => {
		fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}=${city}`)
			.then(res => res.json())
			.then(data => {
				setCityKey(prev => prev = data[0].Key)

				const cityName = data[0].LocalizedName
				

				fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${KEY}`)
					.then(res => res.json())
					.then(data => {

						if (data) {
							let current = {
								ID: cityKey,
								cityName,
								WeatherText: data[0].WeatherText,
								IsDayTime: data[0].IsDayTime,
								Temperature: data[0].Temperature.Metric.Value
							}
							const weatherData = JSON.stringify(current)
							localStorage.setItem(city, weatherData)
							setcurrentData(prev => prev = current)
						}
						else {
							const localData = localStorage.getItem(city)
							setcurrentData(prev => prev = localData)
						}

					})
					.catch((err) => {
						console.log(err, 'current condition data error');
					})

			})
			.catch((err) => {
				console.log(err, 'Autocomplete search data error')
			});
	}, [city])

	useEffect(() => {
		fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${KEY}&details=false&metric=true`)
			.then(res => res.json())
			.then((data) => {
				if (data) {
					const forcastArr = builForcast(data)
					setFivDaysData([...forcastArr])
					const forcasts = JSON.stringify(forcastArr)
					localStorage.setItem(`${city}Forcasts`, forcasts)
					// console.log(data)
				}
				else {
					const localData = localStorage.getItem(`${city}Forcasts`)
					setFivDaysData([...localData])
				}
			})
	}, [currentData])

	return (
		<div className='App'>
			<BrowserRouter>
				<Header showFavorites={showFavorites} />
				<Routes>
					<Route path='/' element={<Home
					 currentData={currentData}
					  fiveDaysData={fiveDaysData}
						 getCityName={getCityName}
						 status={status}
						 changeStatus={changeStatus}
						 />} />
					<Route path='/favorites' element={<Favorites
					favorites={favorites}
					refresh={refresh}
					cityKey={cityKey}
					 />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}


export default App;
