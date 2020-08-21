import React, { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Mohammadreza Goudarzi', id: 1 }])

  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isExist = persons.filter((person) => person.name === newName)
    const newPerson = {
      name: newName,
      id: persons.length + 1,
    }
    if (!isExist){
      console.log('isExist :>> ', isExist);
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
    else
      alert(
        newName + ' is already added to phonebook'
      )
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            onChange={handleChange}
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => <div key={person.id}>{person.name}</div>)}

    </div>
  );
}

export default App;
