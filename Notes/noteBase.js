export default class NoteBase {
    COLORS = {
        yellow: 'yellow-note',
        blue: 'blue-note',
        green: 'green-note',
        red: 'red-note'
    }

    constructor({
        title, 
        color, 
        tags, 
        isPinned = false,
        creationDate = new Date()
    }) {
        if(!Object.keys(this.COLORS).includes(color))
            throw new Error(`Color ${color} is unavailable`)
        this.title = title
        this.color = color
        this.tags = tags
        this.isPinned = isPinned
        this.creationDate = new Date(creationDate)
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
}