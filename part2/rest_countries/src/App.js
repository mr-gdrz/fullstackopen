import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries.js'
import FilterCountries from './components/FilterCountries.js'

function App() {
  const [newSearch, setNewSearch] = useState("")
  const [countries, serCountries] = useState([])

  const handleSearchChange = event =>{
    setNewSearch(event.target.value)
  }

  useEffect(()=>{
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => serCountries(response.data))
  }, [])



  return (
    <div>
      <FilterCountries 
          newSearch={newSearch}
          handleSearchChange = {handleSearchChange} />

      <Countries countries = {countries} newSearch={newSearch}/>
    </div>
  );
}


export default App;
