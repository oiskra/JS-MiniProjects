import { generateHoleCoords, animateBallMovement } from "./gameLogic.js"

const startBtn = document.querySelector('#start-btn')
const wrapper = document.querySelector('.wrapper')
const timer = document.querySelector('#timer')

let timeInterval

const start = () => {
    startBtn.style.display = 'none'
    wrapper.style.display = 'block'
    generateHoleCoords()
    calcTimer()
    requestAnimationFrame(animateBallMovement)
}

const calcTimer = () =>  {
    let s = 0

    timeInterval = setInterval(() => {
        s++
        timer.textContent = `0:${s%60}`
    }, 1000)
}

startBtn.addEventListener('mousedown', start)
