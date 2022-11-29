import { generateHoleCoords, animateBallMovement } from "./gameLogic.js"

const startBtn = document.querySelector('#start-btn')
const wrapper = document.querySelector('.wrapper')
const timer = document.querySelector('#timer')

let timeInterval
let ms = 0, s = 0, m = 0

const start = () => {
    startBtn.style.display = 'none'
    wrapper.style.display = 'block'
    generateHoleCoords()
    //timeInterval = setInterval(calcTimer, 10)
    animateBallMovement()
}

const calcTimer = () =>  {
    timer.textContent = `${m<10?'0'+m:m}:${s<10?'0'+s:s}:${ms<10?'0'+ms:ms}`
    ms++
    if(ms == 100) {
        ms = 0
        s++;
    }
    if(s == 60) {
        s = 0
        m++ 
    }
}

startBtn.addEventListener('click', start)
