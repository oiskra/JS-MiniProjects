import Note from "./note.js";

const wrapper = document.querySelector('.wrapper')
const createNoteWindow = document.querySelector('.create-note-window')
const openNoteWindowBtn = document.querySelector('#open-note-window-btn')
const createNewNoteBtn = document.querySelector('#create-new-note')
const cancelNewNoteBtn = document.querySelector('#cancel-new-note')
const noteContainer = document.querySelector('.note-container')

const init = () => {
    const noteContainer = document.querySelector('.note-container')
    const notes = localStorage.getItem('notes')
    const notesParsed = JSON.parse(notes)
    if(!Array.isArray(notesParsed)) console.log('is not array')
    console.log(notesParsed)
    notesParsed
        .map(el => {
            const {title, content, color} = el
            return new Note({
                title,
                content,
                color
            })
        })
        .map(el => el.createNoteElement())
        .forEach(el => {
            console.log(el)
            noteContainer.appendChild(el)
        });
}


const displayAddNoteWindow = () => {
    wrapper.style.filter = 'blur(10px)'
    createNoteWindow.style.display = 'flex'
}
openNoteWindowBtn.addEventListener('click', displayAddNoteWindow)

const createNewNote = () => {
    const title = document.querySelector('#new-note-title').value
    const content = document.querySelector('#new-note-content').value
    const color = document.querySelector('#new-note-color').value

    const newNote = new Note({
        title,
        content,
        color
    })

    newNote.addNote()
    noteContainer.appendChild(newNote.createNoteElement())
    closeNewNoteWindow()
}
createNewNoteBtn.addEventListener('click', createNewNote)

const closeNewNoteWindow = () => {
    wrapper.style.filter = 'none'
    createNoteWindow.style.display = 'none'
}

cancelNewNoteBtn.addEventListener('click', closeNewNoteWindow)

// const obj = {
//     title: 'test',
//     content: 'test',
//     color: 'blue'
// }

// const n = new Note(obj)
// n.addNote()
init()