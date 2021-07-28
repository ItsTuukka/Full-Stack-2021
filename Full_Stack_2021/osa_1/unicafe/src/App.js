import React, { useState } from 'react'

const Header1 = () => <h1>give feedback</h1>

const Header2 = () => <h1>statistics</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Stats = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const points = good - bad

  return(
    <div>
      <GoodFeedback feedback={good} />
      <NeutralFeedback feedback={neutral} />
      <BadFeedback feedback={bad} />
      <AllFeedback feedback={all} />
      <Average points={points} all={all} />
      <Positive good={good} all={all} />
    </div>
  )
}

const GoodFeedback = ({ feedback }) => (<p>good {feedback} </p>)

const NeutralFeedback = ({ feedback }) => (<p>neutral {feedback} </p>)

const BadFeedback = ({ feedback }) => (<p>bad {feedback} </p>)

const AllFeedback = ({ feedback }) => (<p>all {feedback} </p>)

const Average = ({ points, all }) => (<p>average { points / all} </p>)

const Positive =({ good, all }) => (<p>positive {good / all} % </p>)

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
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App