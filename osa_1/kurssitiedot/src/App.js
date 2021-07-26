import React from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  const part1 = props.part1
  const part2 = props.part2
  const part3 = props.part3
  const tasks1 = props.tasks1
  const tasks2 = props.tasks2
  const tasks3 = props.tasks3

  return(
    <div>
     <Part1 name={part1} tasks={tasks1} />
     <Part2 name={part2} tasks={tasks2} />
     <Part3 name={part3} tasks={tasks3} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        Number of exercises {props.exercises}
      </p>
    </div>
  )
}

const Part1 = (props) => {
  return(
    <div>
      <p>{props.name} {props.tasks}</p> 
    </div>
  )
}

const Part2 = (props) => {
  return(
    <div>
      <p>{props.name} {props.tasks}</p> 
    </div>
  )
}

const Part3 = (props) => {
  return(
    <div>
      <p>{props.name} {props.tasks}</p> 
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} tasks1={exercises1} 
      part2={part2} tasks2={exercises2}
      part3={part3} tasks3={exercises3}/>
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App