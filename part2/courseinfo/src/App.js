import React from 'react';

const Course = ({ course }) => {
   return (
    <div>
      <Header title={course.name} />
      <Content key={course.id} parts={course.parts} />
      <Sum  parts={course.parts} />
    </div>
  )
}
const Header = ({ title }) => <h1> {title} </h1>

const Content = ({ parts}) => {
  console.log('{parts} :>> ', { parts });
  return (
    <div>
      <ul>
        {parts.map((x) =>
          <Part key={x.id} x={x} />
        )}
      </ul>
    </div>
  )
}
const Part = ({ x }) => {
  return (
    <li>
      {x.name} {x.exercises}
    </li>
  )
}

const Sum = ({ parts }) => {

  return (
    <div>
      total of  {parts.reduce((s, ex) => s + ex.exercises, 0)}
    </div>
  )
}

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((x) => <Course key={x.id} course={x} />)}
    </div>
  )
}

export default App;
