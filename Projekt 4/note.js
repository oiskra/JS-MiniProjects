
export default class Note {
    #COLORS = {
        yellow: 'yellow-note',
        blue: 'blue-note',
        green: 'green-note',
        red: 'red-note'
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
        const noteColor = this.#COLORS[this.color]
        note.setAttribute('class', `note ${noteColor}`)
        note.innerHTML = `
            <div class="j">
                <p class="title">${this.title}</p>
                <img src="./pushpin.png" alt="pin">
            </div>
            <p class="content">${this.content}</p>
        `
        return note
    }
}