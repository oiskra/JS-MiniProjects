import NoteBase from "./noteBase.js"

export default class Note extends NoteBase {

    constructor({
        title, 
        content, 
        color, 
        tags, 
        isPinned = false,
        creationDate = new Date()
    }) {
        super({title, color, tags, isPinned, creationDate})
        this.type = 'note'
        this.content = content
        console.log(this)
    }

    createNoteElement() {
        const note = document.createElement('div')
        const noteColor = this.COLORS[this.color]
        if(this.isPinned)
            note.setAttribute('class', `note ${noteColor} pinned`)
        else
            note.setAttribute('class', `note ${noteColor}`)

        note.innerHTML = `
            <div class="note-header">
                <p class="title">${this.title}</p>
                <img src="./pushpin.png" alt="pin">
            </div>
            <div class="content">${this.content}</div>
            <div style="margin:0 5px;">Tags:</div>
        `
        const tags = document.createElement('div')
        tags.setAttribute('class', `tag-container ${noteColor}`)

        this.tags.forEach(el => {
            const tag = document.createElement('div')
            tag.setAttribute('class', 'tag')
            tag.textContent = '#' + el
            tags.appendChild(tag)
        })
        
        note.appendChild(tags)

        return note
    }
}