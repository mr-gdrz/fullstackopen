import React, { useState, useEffect } from 'react'
import personDb from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personDb
      .getAll().then(r => {
        setPersons(r)
      })
  }, [])

  const handleDeleteOne = (name, id) => {
    if (window.confirm(`Are you sure to delete ${name} ?`)) {
      personDb
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setNewName('')
          setNewNumber('')
          setNotification(`person by name ${name} deleted successfully`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log('error')
          setError(true)
          setNotification(`this object does not exist any more`)
          setPersons(persons.filter(p => p.name !== name))
          setTimeout(() => {
            setNotification(null)
            setError(false)
          }, 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const isExist = persons.filter(person => person.name === newName)

    if (!(isExist.length > 0)) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 101)
      }
      personDb
        .create(newPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`person added successfully`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(error.response.data)
        })
    }
    else {
      if (window.confirm(`${isExist[0].name} is already exist, do you want to update its information?`)) {

        const newPerson = {
          name: isExist[0].name,
          number: newNumber,
          id: isExist[0].id
        }
        personDb
          .updatePerson(isExist[0].id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.name === newPerson.name ? updatedPerson : p))
            setNotification(`${newPerson.name} updated successfully`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
   // console.log(newFilter)
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleFilterChange} value={newFilter} /></div>
      <h2>Add a new</h2>
      <Notification error={error} message={notification} />
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
          .map((person, i) =>
            <Person
              key={i}
              person={person}
              handleDelete={() => handleDeleteOne(person.name, person.id)}
            />)}
      </ul>
    </div>
  );
}

export default App;
