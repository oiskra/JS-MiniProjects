import Note from "./note.js";

const noteContainer = document.querySelector('.note-container')
const searchBtn = document.querySelector('#search-btn')
const NOTES_ELEMENTS = []

const init = () => {
    const notes = localStorage.getItem('notes')
    if(!notes) return
    const notesParsed = JSON.parse(notes)
    if(!Array.isArray(notesParsed)) console.log('is not array')
    console.log(notesParsed)
    notesParsed
        .map(el => {
            const {title, content, color, tags, creationDate} = el
            return new Note({
                title,
                content,
                color,
                tags,
                creationDate
            })
        })
        .map(el => {
            const noteElem = el.createNoteElement()
            NOTES_ELEMENTS.push({noteObj: el, HTMLelement: noteElem})
            return noteElem
        })
        .forEach(el => {
            console.log(el)
            noteContainer.appendChild(el)
        }); 
}
init()

// const search = () => {
    
    // }
    // searchBtn.addEventListener('click', search)
    
const searchInput = document.querySelector('#search-box')

searchInput.addEventListener('input', e => {
    const val = e.target.value.toLowerCase()
    NOTES_ELEMENTS.forEach(note => {
        const isVisible = 
            note.noteObj.title.toLowerCase().includes(val) ||
            note.noteObj.content.toLowerCase().includes(val) ||
            note.noteObj.color.toLowerCase().includes(val) ||
            note.noteObj.tags.some(tag => tag.includes(val))



        note.HTMLelement.classList.toggle('hide', !isVisible)
    })
})


