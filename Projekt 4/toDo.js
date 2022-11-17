import NoteBase from "./noteBase.js"

export default class ToDo extends NoteBase {  

    constructor({
        title, 
        color, 
        tags,
        tasks,
        isPinned = false,
        creationDate = new Date()
    }) {
        super({title, color, tags, isPinned, creationDate})
        this.type = 'toDo'
        this.tasks = tasks
        console.log(this)

    }

    createNoteElement() {
        const template = document.querySelector('#to-do-template');
        const clone = template.content.cloneNode(true)
        const toDoNote = clone.querySelector('.note')
        toDoNote.classList.add(this.COLORS[this.color])
        const title = toDoNote.querySelector('.title')
        title.textContent = this.title
        const tasksContainer = toDoNote.querySelector('.tasks')
        console.log(this.tasks)
        this.tasks
            .map(el => {
                const li = document.createElement('li')
                this.#addEventToTask(li)
                li.textContent = el
                return li
            })
            .forEach(el => tasksContainer.appendChild(el))

        const tagContainer = toDoNote.querySelector('.tag-container')
        tagContainer.classList.add(`${this.COLORS[this.color]}`)
        this.tags.forEach(el => {
            const tag = document.createElement('div')
            tag.setAttribute('class', 'tag')
            tag.textContent = '#' + el
            tagContainer.appendChild(tag)
        })

        return toDoNote
    }

    #addEventToTask(task) {
        task.addEventListener('click', () => {
            if(task.classList.contains('task-done')) {
                const undone = confirm('Are you sure you want to UNDONE this task?')
                undone && task.classList.toggle('task-done')
                return
            }
            task.classList.toggle('task-done')
        })
    }
}