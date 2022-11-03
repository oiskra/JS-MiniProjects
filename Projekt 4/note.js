export default class Note {
    #COLORS = {
        yellow: 'yellow',
        blue: 'lightblue',
        green: 'green'
    }

    constructor({title, content, color}) {
        this.title = title
        this.content = content
        this.color = color
        this.isPinned = false
        this.createdAt = new Date()
    }

}

