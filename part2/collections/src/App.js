import React, { useState, useEffect } from "react";
import Note from './components/Note'
import noteServices from './services/notes'
import Notification from './components/Notification'




const Footer = () =>{
    const footerStyle = {
        color : 'Green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return(
        <div style = {footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </div>

    )
}

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const toggleDelete = id =>{
        noteServices.deleteNote(id)
        .then(() => {
            setNotes(notes.filter(n => n.id !== id))
            setErrorMessage('deleted')
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000);
        })
    }

    const toggleImportance = id => {

        const note = notes.find(n => n.id === id)
        //...note called shallow copy
        const changedNote = { ...note, important: !note.important }
        
        noteServices
            .update(id, changedNote).then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note ${note.content} was alredy removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
                //...doing something else, on error situation
            })


    }

    useEffect(() => {
        noteServices
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])


    const addNote = event => {
        event.preventDefault()
        // console.log('button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            //id: not  es.length + 1,
        }
        
        noteServices
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleChange = (event) => {
        setNewNote(event.target.value)
        /*handling changes*/
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note, i) =>
                    <Note
                        key={i}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                        toggleDelete={()=> toggleDelete(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleChange}
                />
                <button type="submit">save</button>
            </form>

            <Footer />
        </div>
    )
}

export default App