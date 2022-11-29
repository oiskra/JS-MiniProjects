export default class Timer {
    constructor() {
        this.m = 0
        this.s = 0
        this.ms = 0
        this.time = ''
        this.interval = undefined
        this.timerElement = document.querySelector('#timer')
    }

    start() {
        this.interval = setInterval(() => {
            this.timerElement.textContent = `${this.m<10?'0'+this.m:this.m}:${this.s<10?'0'+this.s:this.s}:${this.ms<10?'0'+this.ms:this.ms}`
            this.ms++
            if(this.ms == 100) {
                this.ms = 0
                this.s++;
            }
            if(this.s == 60) {
                this.s = 0
                this.m++ 
            }
        }, 10)
    }

    stop() {
        clearInterval(this.interval)
        this.time = this.timerElement.textContent
    }
}