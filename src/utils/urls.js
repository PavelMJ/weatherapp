export const KEY = 'Px9TOk4MmYuCuLIIdU5X3mnCG0tmKWo7'
export const autocomplete=`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${city}`
export const autocomleteServerUrl=`http://localhost:4444/autocomplete/${city}`
export const currentconditions= `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${KEY}`
export const currentconditionsServerUrl=`http://localhost:4444/currentconditions/${cityKey}`
export const forcasts= `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${KEY}`
export const forcastsServerUrl=`http://localhost:4444/forecasts/${cityKey}`