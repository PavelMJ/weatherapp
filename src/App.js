
import './App.css';
import dateToDay from './utils/dayConverter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import { useEffect, useState } from 'react';


function App() {
	const KEY = 'Wt52VB1aWbvyGcarDSV7vT2OSSZZ1J3G'

	const [city, setCity] = useState('tel aviv')
	const [cityKey, setCityKey] = useState('215793')
	const [cityName,setCityName]=useState('') 
	const [currentData, setCurrentData] = useState({})
	const [fiveDaysData, setFivDaysData] = useState([])
	// console.log(cityKey);
	// console.log(fiveDaysData);

	const [favorites, setFavorites]=useState([])
	const [status, setStatus]=useState('Add to Favorites')
	const setFromFavorites=(key)=>{
		setCityKey(prev=> prev=key)
	}




	const changeStatus=()=>{
		if(currentData.isFavorit){
			setStatus("Add to Favorites")
			const filtred = favorites.filter(val => val.id !== currentData.ID)
			currentData.isFavorit = false
			setCurrentData(prev=> prev = currentData)
			setFavorites([...filtred])
			
		}
		else{
			setStatus("Remove from Favorites")
			const newFavorit={
				id: currentData.ID,
				cityName: currentData.cityName
			}
			setFavorites([...favorites, newFavorit])
			currentData.isFavorit = true
			setCurrentData(prev=> prev = currentData)
			
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
		if(favorites.length !==0){
			const favoritData = JSON.stringify(favorites)
			localStorage.setItem('favoritData',favoritData)
		}

			
	},[favorites])



	useEffect(() => {
		fetch(`http://localhost:4444/autocomplete/${city}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(!data[0]){
				let localData = localStorage.getItem(`${city}`)
				if(localData){
					setCurrentData(JSON.parse(localData))
				}
				else{
					let current = {
					ID:'none',
					cityName: "City does't exist",
					WeatherText: '',
					Temperature: '',
					isFavorit: false
				}
				setCurrentData(current)}
				
				
			}
			else{
				setCityKey(prev => prev = data[0].Key)
				setCityName(prev=> prev = data[0].LocalizedName)
	
			}
		})
		.catch((err) => {console.error(err, 'Autocomplete search data error')
	
	})}, [city])



	useEffect(()=>{
		
		fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${KEY}`)
		.then(res => res.json())
		.then(data => {
			if(!data[0]){

			}
			if (data[0]) {
				let current = {
					ID: cityKey,
					cityName,
					WeatherText: data[0].WeatherText,
					Temperature: data[0].Temperature.Metric.Value,
					isFavorit: false
				}
				setStatus('Add to Favorites')
				favorites.forEach((val)=>{
					if(val.id === current.ID){
						current.isFavorit =true
						setStatus('Remove from Favorites')
					}
				})
		

				const weatherData = JSON.stringify(current)
				localStorage.setItem(city, weatherData)
				setCurrentData(current)
			}
			else {
				const localData = localStorage.getItem(city)
				
				setCurrentData(prev => prev = JSON.parse(localData))
			}

		
	})
		.catch((err) => {
			console.log(err, 'current condition data error');
		}).finally(()=>{
			const localData = localStorage.getItem(city)

				setCurrentData(prev => prev = JSON.parse(localData))
		})

	},[cityKey])


	useEffect(() => {
		fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${KEY}&details=false&metric=true`)
			.then(res => res.json())
			.then((data) => {
				if (data) {
					const forcastArr = builForcast(data)
					setFivDaysData([...forcastArr])
					const forcasts = JSON.stringify(forcastArr)
					localStorage.setItem(`${city}Forcasts`, forcasts)
			
				}
				else {
					const localData = localStorage.getItem(`${city}Forcasts`)
					setFivDaysData([...JSON.parse(localData)])
				}
			}).catch((err)=>{console.error(err,'fetch error')})
	}, [currentData])

	return (
		<div className='App'>
			<BrowserRouter>
				<Header  />
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
					KEY={KEY}
					setFromFavorites={setFromFavorites}
					
					 />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}


export default App;
