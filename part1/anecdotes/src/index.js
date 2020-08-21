import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text }) =>(

  <button onClick = {handleClick}>{text}</button>
)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(new Uint8Array(6))
  const [maxVote, setMaxVoted] = useState(0)

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() *anecdotes.length))
    
  }
  const handleVoteClick = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoint(copy)
    console.log('points[selected] ',points[selected]  )
    console.log('points[maxVote] ',points[maxVote]  )
    if (points[selected] > points[maxVote]){
      setMaxVoted(selected)
    }
  }
  return (
    <div>
      <div>
        {props.anecdotes[selected]}
      </div>
      <br/>
      has {points[selected]} votes
      <br/>
      <Button handleClick ={handleVoteClick} text = 'vote'/>  
      <Button handleClick={handleRandomClick} text = 'anecdote'/>
      <h1> Anecdotes with most votes</h1>   
      {points[maxVote]}
      <br/>
      {props.anecdotes[maxVote]} 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)