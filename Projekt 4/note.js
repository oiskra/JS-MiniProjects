
export default class Note {
    #COLORS = {
        yellow: 'yellow-note',
        blue: 'blue-note',
        green: 'green-note',
        red: 'red-note'
    }

    constructor({
        title, 
        content, 
        color, 
        tags, 
        creationDate = new Date().toISOString()
    }) {
        if(!Object.keys(this.#COLORS).includes(color))
            throw new Error(`Color ${color} is unavailable`)
        this.type = 'note'
        this.title = title
        this.content = content
        this.color = color
        this.tags = tags
        this.isPinned = false
        this.creationDate = creationDate
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
            <p style="margin:0 5px;">Tags:</p>
        `
        const tags = document.createElement('div')
        tags.setAttribute('class', `tag-container ${noteColor}`)

        this.tags.forEach(el => {
            const tag = document.createElement('div')
            tag.setAttribute('class', 'tag')
            tag.textContent = el
            tags.appendChild(tag)
        })
        
        note.appendChild(tags)

        return note
    }

    // createToDoElement() {
    //     const note = document.createElement('div')
    //     const noteColor = this.#COLORS[this.color]
    //     note.setAttribute('class', `note ${noteColor}`)
    //     note.innerHTML = `
    //         <div class="j">
    //             <p class="title">${this.title}</p>
    //             <img src="./pushpin.png" alt="pin">
    //         </div>
    //     `
    //     note.appendChild(this.content)

    //     return note
    // }
}