/* eslint-disable  */

import './App.css'
import { useRef, useEffect, useState } from 'react'
import List from './List'
import ClearTask from './ClearTask'
import UpdateButton from './UpdateButton'


function App() {
  const inputRef = useRef(null)
  const [todoList, setTodoList] = useState([])
  const [newTask, setNewTask] = useState("")
  const addBtnRef = useRef(null)
  const [currentId, setCurrentId] = useState("")
  const updateBtnRef = useRef(null)

  useEffect(() => inputRef.current.focus())
  useEffect(() => {
    if (inputRef.current.value == "") {
      addBtnRef.current.style.display = "block"
    } else {
      addBtnRef.current.style.display = "none"
      updateBtnRef.current.style.display = "block"
    }

  }, [])
  //load data from localstorage
  const loadDataFromLocalStorage = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todo")) || [];
    if (storedTodos.length > 0) {
      setTodoList(storedTodos)
    }
  }


  useEffect(() => {
    loadDataFromLocalStorage()
  }, [])

  //save data to localstorage
  const saveToLocalStorage = () => {
    localStorage.setItem("todo", JSON.stringify(todoList))
  }

  useEffect(() => {
    saveToLocalStorage();
  }, [todoList])


  const handleChange = () => {
    setNewTask(inputRef.current.value)
  }

  const addTask = () => {
    if (inputRef.current.value == "") { inputRef.current.focus(); return }
    const task = {
      id: (todoList.length === 0) ? 1 : todoList[todoList.length - 1].id + 1, //Date.now().toString().substr(-3),
      taskName: newTask,
    };

    setTodoList([...todoList, task])
    inputRef.current.value = ""
  }

  //delete task
  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id))
  }

  //edit task
  const editTask = (id) => {
    const updateTodo = todoList.filter((task) => {
      if (task.id === id) {
        inputRef.current.value = task.taskName
        addBtnRef.current.style.display = "none"
        updateBtnRef.current.style.display = "block"
        inputRef.current.focus()
        setCurrentId(id)
        return { ...task }
      }
      return { ...task }
    });
    setTodoList(updateTodo)
  }

  const handleUpdate = () => {
    const updateList = todoList.filter(function (task) {
      return (task.id == currentId) ? task.taskName = inputRef.current.value : task

    })

    setTodoList(updateList)
    inputRef.current.value = ""
    addBtnRef.current.style.display = "block"
    updateBtnRef.current.style.display = "none"
  }

  const clearAll = () => {
    const answer = confirm("You are about to clear the entire task !")
    if (answer) { localStorage.clear() } else { return; }
    setTodoList([])
  }

  return (
    <div className="taskContainer">
      <header><h3 className='title'>Todolist</h3> </header>
      <ClearTask clearAll={clearAll} />
      <input placeholder='Add Task Here' className='task-field'
        type="text" ref={inputRef} onChange={handleChange} />
      <button ref={addBtnRef} className='addTask-btn' onClick={addTask}>Add Task</button>
      <UpdateButton ref={updateBtnRef} updateBtnRef={updateBtnRef} handleUpdate={handleUpdate} />
      <div className='todo'>
        {todoList.map((task, index) => {

          return (
            <>

              <List id={task.id}
                taskName={task.taskName}
                key={index}
                deleteTask={deleteTask}
                editTask={editTask}

              />

            </>
          )
        })}



      </div>


    </div >
  )
}

export default App
