import Note from "./note.js";

const noteContainer = document.querySelector('.note-container')

const init = () => {
    const notes = localStorage.getItem('notes')
    if(!notes) return
    const notesParsed = JSON.parse(notes)
    if(!Array.isArray(notesParsed)) console.log('is not array')
    console.log(notesParsed)
    notesParsed
        .map(el => {
            const {title, content, color,tags} = el
            return new Note({
                title,
                content,
                color,
                tags
            })
        })
        .map(el => el.createNoteElement())
        .forEach(el => {
            console.log(el)
            noteContainer.appendChild(el)
        });
}

init()