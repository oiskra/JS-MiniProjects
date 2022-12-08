import Note from "./notes/note.js";
import ToDo from "./todos/toDo.js";

const noteContainer = document.querySelector('.note-container')
const searchInput = document.querySelector('#search-box')
const pinnedContainer = document.querySelector('.pinned-container')
const NOTES_ELEMENTS = []

const init = () => {
    const notes = localStorage.getItem('notes')
    if(!notes) return
    const notesParsed = JSON.parse(notes)
    if(!Array.isArray(notesParsed)) console.log('is not array')
    console.log(notesParsed)
    notesParsed
        .map(el => {
            if(el.type === 'note') {
                const {title, content, color, tags, isPinned, creationDate} = el
                return new Note({
                    title,
                    content,
                    color,
                    tags,
                    isPinned,
                    creationDate
                })
            }
            else {
                const {title, color, tags, tasks, isPinned, creationDate} = el
                return new ToDo({
                    title,
                    color,
                    tags,
                    tasks,
                    isPinned,
                    creationDate
                })
            }

        })
        .map(el => {
            const noteElem = el.createNoteElement()
            NOTES_ELEMENTS.push({noteObj: el, HTMLelement: noteElem})
            return noteElem
        })
        .forEach(el => {
            el.isPinned ? 
            pinnedContainer.appendChild(el) 
            :
            noteContainer.appendChild(el)
        }); 
}
init()

const createPinEventOnImage = () => {
    const imgs = Array.from(document.querySelectorAll('[alt="pin"]'))
    imgs.forEach(img => {
        img.addEventListener('click', () => {
            const note = img.closest('.note')
            note.remove()

            if(!note.classList.contains('pinned')) 
                pinnedContainer.appendChild(note)
            else 
                noteContainer.appendChild(note)
            note.classList.toggle('pinned')

            const noteTitle = getTitleFromNote(note)
            updatePinnedStatus(noteTitle)
        })
    })
}
createPinEventOnImage()

const createEditEventOnImage = () => {
    const imgs = Array.from(document.querySelectorAll('[alt="edit"]'))
    imgs.forEach(img => {
        img.addEventListener('click', () => {
            if(img.hasAttribute('to-do-edit')) {
                
            }
        })
    })

}

const getTitleFromNote = (note) => {
    const noteChildren = Array.from(note.children)
    const noteHeaderChildren = Array.from(noteChildren
        .find(el => el.className === 'note-header')
        .children)
    const title = noteHeaderChildren.find(el => el.className === 'title').textContent

    return title
}

const updatePinnedStatus = (title) => {
    const noteArr = JSON.parse(localStorage.getItem('notes'))
    const noteIndex = noteArr.findIndex(note => note.title === title) 
    noteArr[noteIndex].isPinned = !noteArr[noteIndex].isPinned
    localStorage.setItem('notes', JSON.stringify(noteArr))
}

searchInput.addEventListener('input', e => {
    const val = e.target.value.toLowerCase()
    NOTES_ELEMENTS.forEach(note => {
        const {title, content, color, tags} = note.noteObj
        const isVisible = 
            title.toLowerCase().includes(val) ||
            content.toLowerCase().includes(val) ||
            color.toLowerCase().includes(val) ||
            tags.some(tag => tag.includes(val))
        note.HTMLelement.classList.toggle('hide', !isVisible)
    })
})







