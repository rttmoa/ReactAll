import React from 'react'
import { FilterLink } from './FilterLink'
 


const TodoFilters: React.FC = () => {
  return (
    <ul className='filters'>
      <FilterLink filter="">All</FilterLink>
      <FilterLink filter="active">Active</FilterLink>
      <FilterLink filter="completed">Completed</FilterLink>
    </ul>
  )
}

export default TodoFilters
