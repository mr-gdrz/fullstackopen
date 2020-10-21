import React from 'react'


const Note = ({ note, toggleImportance, toggleDelete }) => {
  const label = note.important
    ? "Make not important" 
    : "Make important"
  return (
    < li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={toggleDelete}>Delete</button>
    </li >
  )
}



export default Note