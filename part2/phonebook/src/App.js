import React, { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{ 
    axios
    .get("http://localhost:3001/persons")
    .then(responses => {
      setPersons(responses.data)
    })
    
  },[])  

  const addPerson = (event) => {
    event.preventDefault()
    const isExist = persons.filter((person) => person.name === newName)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (!(isExist.length > 0)) {
      console.log('isExist :>> ', isExist);
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
    else
      alert(
        newName + ' is already added to phonebook'
      )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(newFilter)
    setNewFilter(event.target.value)
  }
  console.log('newFilter :>> ', newFilter);
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleFilterChange} value={newFilter} /></div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      .map(person=> <div key={person.name}> {person.name}  {person.number} </div>)}

    </div>
  );
}

export default App;
