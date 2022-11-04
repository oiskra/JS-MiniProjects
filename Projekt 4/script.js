import Note from "./note.js";

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

//const n = new Note(obj)
init()