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
    //requestAnimationFrame(animateBallMovement)
}

const calcTimer = () =>  {
    let ms = 0
    timeInterval = setInterval(() => {
        ms++
        timer.textContent = `${Math.floor((ms/100))}:${ms%100}`
    }, 1)
}

startBtn.addEventListener('click', start)