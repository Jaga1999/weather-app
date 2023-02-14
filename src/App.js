import React from 'react'
import Search from './components/search/Search'
import CurrentWeather from './components/current-Weather/CurrentWeather'

const App = () => {

  const handleonSearchChange =(searchData) =>{
    console.log(searchData)
  }

  return (
    <div className='container'>
      
      <Search onSearchChange={handleonSearchChange}/>
      <CurrentWeather />
    </div>
    
  )
}

export default App