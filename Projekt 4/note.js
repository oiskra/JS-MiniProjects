export default class Note {
    #COLORS = {
        yellow: 'yellow',
        blue: 'lightblue',
        green: 'green'
    }


    constructor({title, content, color}) {
        if(!Object.keys(this.#COLORS).includes(color))
            throw new Error(`Color ${color} is unavailable`)
        this.title = title
        this.content = content
        this.color = color
        this.isPinned = false
        this.createdAt = new Date().toISOString()
    }

    addNote() {
        const notes = localStorage.getItem('notes')
        if(!notes) {
            localStorage.setItem('notes', JSON.stringify([this]))
            return
        }
        const notesParsed = JSON.parse(notes)
        notesParsed.push(this)
        localStorage.setItem('notes', JSON.stringify(notesParsed))
    }

    createNoteElement() {
        const note = document.createElement('div')
        const noteTitle = document.createElement('p')
        const noteContent = document.createElement('p')
        note.setAttribute('class', 'note')
        noteTitle.setAttribute('class', 'title') 
        noteContent.setAttribute('class', 'content') 
        noteTitle.textContent = this.title
        noteContent.textContent = this.content
        note.appendChild(noteTitle)
        note.appendChild(noteContent)

        return note
    }

}