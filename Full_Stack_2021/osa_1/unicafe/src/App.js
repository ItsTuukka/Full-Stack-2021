import React, { useState } from 'react'

const Header1 = () => <h1>give feedback</h1>

const Header2 = () => <h1>statistics</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const points = good - bad

  if (all === 0) {
    return(
    <Nofeedback />
    )
  }

  return(
    <div>
      <StatisticLine text="good" value={good} /> 
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={points/all} />
      <StatisticLine text="positive" value={good/all * 100 + " %"} />
    </div>
  )
}

const Nofeedback = () => (<p>No feedback given</p>)

const StatisticLine = ({ text, value }) => (<p>{text} {value}</p>)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header1 />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header2 />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App