
import './App.css';
import dateToDay from './utils/dayConverter';
import { HashRouterRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import { useEffect, useState } from 'react';



function App() {
	const [city, setCity] = useState('rehovot')
	const [cityKey, setCityKey] = useState('215793')
	const [cityName,setCityName]=useState('') 
	const [currentData, setCurrentData] = useState({})
	const [fiveDaysData, setFivDaysData] = useState([])
	const [favorites, setFavorites]=useState([])
	const [status, setStatus]=useState('Add to Favorites')
	console.log(cityName);

	const KEY = 'H75dp9AlEPodjtrF2jWEkg010Kp4Lpmw'
	// const autocomplete=`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${city}`
	// const autocomleteServerUrl=`http://localhost:4444/autocomplete/${city}`
	// const currentconditions= `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${KEY}`
	// const currentconditionsServerUrl=`http://localhost:4444/currentconditions/${cityKey}`
	// const forcasts= `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${KEY}`
	// const forcastsServerUrl=`http://localhost:4444/forecasts/${cityKey}`
 

	useEffect(()=>{
		const data =localStorage.getItem('favoritData')
		if(data){
			const favoritData = JSON.parse(data)
			setFavorites([...favoritData])
		}
	},[])

	console.log(favorites);
	const setFromFavorites=(key)=>{
		setCityKey(prev=> prev=key)
	}


	const changeStatus=()=>{
		if(currentData.isFavorit){
			setStatus("Add to Favorites")
			const filtred = favorites.filter(val => val.ID !== currentData.ID)
			currentData.isFavorit = false
			setCurrentData(prev=> prev = currentData)
			setFavorites([...filtred])
			
		}
		else{
			setStatus("Remove from Favorites")
			currentData.isFavorit = true
			setFavorites([...favorites, currentData])
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
		
			const favoritData = JSON.stringify(favorites)
			localStorage.setItem('favoritData',favoritData)
		
	},[favorites])



	useEffect(() => {
		fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${city}`)
		.then(res => res.json())
		.then(data => {
			console.log(data[0]);
			if(!data[0]){
				let jsonData = localStorage.getItem(`${city}`)
				if(jsonData){
					
				let localData = JSON.parse(jsonData)
				
				favorites.forEach((val)=>{
					if(localData.ID ===val.ID){
						localData.isFavorit=true
						setStatus('Remove from Favorites')
					}
				})
				setCurrentData(localData)


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
			console.log(data);
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
					if(val.ID === current.ID){
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
		
		})

	},[cityKey])


	useEffect(() => {
		fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${KEY}&metric=true`)
			.then(res => res.json())
			.then((data) => {
				console.log(data);
				if (!data || data.Code=='ServiceUnavailable') {
					const localData = localStorage.getItem(`${city}Forcasts`)
					setFivDaysData([...JSON.parse(localData)])
			
				}
				else {
					const forcastArr = builForcast(data)
					setFivDaysData([...forcastArr])
					const forcasts = JSON.stringify(forcastArr)
					localStorage.setItem(`${city}Forcasts`, forcasts)
				}
			}).catch((err)=>{console.error(err,'fetch error')})
		
	}, [currentData])

	return (
		<div className='App'>
			<HashRouterRouter>
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
			</HashRouterRouter>
		</div>
	)
}


export default App;
