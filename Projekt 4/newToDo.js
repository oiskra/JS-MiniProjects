'use strict'
import Note from "./note.js"

const wrapper = document.querySelector('.wrapper')
const openTodoWindowBtn = document.querySelector('#open-todo-window-btn')
const createTodoWindow = document.querySelector('.create-todo-window')
const cancelNewTodoBtn = document.querySelector('#cancel-new-todo')
const createNewTodoBtn = document.querySelector('#create-new-todo')
const noteContainer = document.querySelector('.note-container')

const addTaskBtn = document.querySelector('#add-task')
const tasks = document.querySelector('.tasks')

const openNoteWindowBtn = document.querySelector('#open-note-window-btn')

const displayNewTodoWindow = () => {
    openNoteWindowBtn.disabled = true
    wrapper.style.filter = 'blur(10px)'
    createTodoWindow.style.display = 'flex'
}
openTodoWindowBtn.addEventListener('click', displayNewTodoWindow)

const closeNewTodoWindow = () => {
    openNoteWindowBtn.disabled = false
    wrapper.style.filter = 'none'
    createTodoWindow.style.display = 'none'
}
cancelNewTodoBtn.addEventListener('click', closeNewTodoWindow)

const addingTasks = () => {
    const newTaskValue = document.querySelector('#new-task')
    const newTask = document.createElement('li')
    newTask.textContent = newTaskValue.value
    tasks.prepend(newTask)

    newTaskValue.value = ''
    
}
addTaskBtn.addEventListener('click', addingTasks)

const createNewTodo = () => {
    const title = document.querySelector('#new-todo-title').value
    const color = document.querySelector('#new-todo-color').value
    const tasks = Array.from(document.querySelector('.tasks').children)

    const content = document.createElement('ul')
    tasks.forEach(el => {
        content.appendChild(el)
    });
    console.log(tasks)
    console.log(content)

    const newTodo = new Note({
        title,
        content,
        color,
        isToDo: true
    })

    newTodo.addNote()
    noteContainer.appendChild(newTodo.createToDoElement())
    closeNewTodoWindow()
}
createNewTodoBtn.addEventListener('click', createNewTodo)
