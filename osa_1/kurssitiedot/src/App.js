import React from 'react'

const Header = (props) => {
  return(
      <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]

  return(
    <div>
     <Part1 name={part1.name} tasks={part1.exercises} />
     <Part2 name={part2.name} tasks={part2.exercises} />
     <Part3 name={part3.name} tasks={part3.exercises} />
    </div>
  )
}

const Total = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]

  return(
      <p>
        Number of exercises {part1.exercises + part2.exercises + part3.exercises}
      </p>
  )
}

const Part1 = (props) => {
  return(
      <p>{props.name} {props.tasks}</p> 
  )
}

const Part2 = (props) => {
  return(
      <p>{props.name} {props.tasks}</p> 
  )
}

const Part3 = (props) => {
  return(
      <p>{props.name} {props.tasks}</p> 
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App