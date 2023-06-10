import React from 'react'
import Conditions from './Conditions'

export default function Favorites({ favorites, KEY, setFromFavorites }) {



	return (

		<div className='Favorites'>
			<div style={{fontSize:'25px', color:'white'}}>Favorites</div>
			<div className='favor-cards'>
				{favorites.map((data) => {
					return <Conditions key={data.id}  data={data} KEY={KEY}
						setFromFavorites={setFromFavorites}
					/>
				})}

			</div>

		</div>
	)
}
