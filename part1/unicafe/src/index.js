import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.sum === 0 && props.title === true) {
    return (
      <tr>
        <td>No feedback given</td>
      </tr>
    )
  }
  if (props.sum === 0)
    return (
      <tr>
        <td>

        </td>
      </tr>
    )
  return (
    <tr>
      <td>{props.name}</td><td> {props.sisalto}</td>
    </tr>
  )


}

const App = () => {


  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1> Statistics</h1>

      <table>
        <tbody>
          <Statistics sum={good + bad + neutral} title={true} />
          <Statistics title={true} summa={good + bad + neutral} />
          <Statistics name="good" summa={good + bad + neutral} sisalto={good} />
          <Statistics name="neutral" summa={good + bad + neutral} sisalto={neutral} />
          <Statistics name="bad" summa={good + bad + neutral} sisalto={bad} />
          <Statistics name="Average" summa={good + bad + neutral} sisalto={(good - bad) / (good + bad + neutral)} />
          <Statistics name="positiveness" summa={good + bad + neutral} sisalto={(good) / (bad + good + neutral) * 100} />
        </tbody>
      </table>


    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)