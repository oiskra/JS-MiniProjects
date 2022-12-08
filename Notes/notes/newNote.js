'use strict'

import Note from "./note.js"

const wrapper = document.querySelector('.wrapper')
const createNoteWindow = document.querySelector('.create-note-window')
const openNoteWindowBtn = document.querySelector('#open-note-window-btn')
const createNewNoteBtn = document.querySelector('#create-new-note')
const cancelNewNoteBtn = document.querySelector('#cancel-new-note')
const noteContainer = document.querySelector('.note-container')

const openTodoWindowBtn = document.querySelector('#open-todo-window-btn')

const displayNewNoteWindow = () => {
    openTodoWindowBtn.disabled = true
    wrapper.style.filter = 'blur(10px)'
    createNoteWindow.style.display = 'flex'
}
openNoteWindowBtn.addEventListener('click', displayNewNoteWindow)

const closeNewNoteWindow = () => {
    openTodoWindowBtn.disabled = false
    wrapper.style.filter = 'none'
    createNoteWindow.style.display = 'none'
}
cancelNewNoteBtn.addEventListener('click', closeNewNoteWindow)

const createNewNote = () => {
    const title = document.querySelector('#new-note-title').value
    const content = document.querySelector('#new-note-content').value
    const color = document.querySelector('#new-note-color').value
    const tagsValue = document.querySelector('#new-note-tags').value
    const tags = tagsValue.split(',')

    const newNote = new Note({
        title,
        content,
        color,
        tags,
    })

    newNote.addNote()
    noteContainer.appendChild(newNote.createNoteElement())
    closeNewNoteWindow()
}
createNewNoteBtn.addEventListener('click', createNewNote)

