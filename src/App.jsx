import { useState } from 'react'
import './App.css'


export default function App() {
  const [newItem, setNewItem] = useState('')
  const [todo, setTodo] = useState([])

  function handleSubmit(e) {
    e.preventDefault();

    setTodo((currentTodo) => {
      return [
        ...currentTodo, { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })
    setNewItem('')
  }

  function toggleTodo(id, completed) {
    setTodo(currentTodo => {
      return (currentTodo.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }

        return todo
      }
      ))
    })
  }

  function deleteTodo(id) {
    setTodo(currentTodo => {
      return currentTodo.filter(todo => todo.id != id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item" className='header'>New Item</label>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} className='input input-primary' type="text" id='item' />
        <button className='btn btn-primary'> Add </button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todo.length === 0 && 'No Todos'}
        {todo.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input className='input' type="checkbox" checked={todo.completed} onChange={e => {toggleTodo(todo.id, e.target.checked)}} />
                {todo.title}
                <button onClick={() => deleteTodo(todo.id)} className='btn btn-outline btn-red' type="button"> Delete </button>
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}