import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEYS = 'ToDoApp.todos'

function App() {
  const [todos, setToDos] = useState([{ id: 1, name: '', complete:false}])
  const toDoNameRef= useRef()
  //const { v4: uuidv4} = require('uuid');

  useEffect(() =>{
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS))
    if (storedToDos) setToDos(storedToDos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS, JSON.stringify(todos))
  },[todos])

  function toggleToDo(id) {
    const newToDos = [...todos]
    const todo = newToDos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setToDos(newToDos)
  }
  
  function handleAddToDo(e){
    const name = toDoNameRef.current.value
    if (name === '') return
    setToDos(prevToDos =>{
      return [...prevToDos, {id: uuidv4(), name: name, complete: false}]
    })
    toDoNameRef.current.value = null
  }

  function handleClearToDos(){
    const newToDos= todos.filter(todo => !todo.complete)
    setToDos(newToDos)
  }

  return (
    <>
    <ToDoList todos={todos} toggleToDo={toggleToDo}/>
    <input ref={toDoNameRef}type="text"/>
    <button onClick={handleAddToDo}>Add ToDo</button>
    <button onClick={handleClearToDos}>Clear Completed ToDos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
