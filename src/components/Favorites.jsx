import React from 'react'

export default function Favorites({favorites, refresh}) {
	return (

		<div className='Favorites'>favorites
			{favorites.map((city)=>{
				return <div className='favorit-card'></div>
			})}

		</div>
	)
}
