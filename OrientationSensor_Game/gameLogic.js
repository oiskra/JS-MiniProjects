
import Ball from "./ball.js"
import Blackhole from "./blackhole.js"
import Vector from "./vector.js"
import Timer from "./timer.js"
import { map } from "./helperFunctions.js"

const ballElement = document.querySelector('#ball')
const hole = document.querySelector('#hole')
const blackHoleElement = document.querySelector('.black-hole')
const wrapper = document.querySelector('.wrapper')
const startBtn = document.querySelector('#start-btn')
const info = document.querySelector('#info')


const BALL_RADIUS = 25
const BLACKHOLE_RADIUS = 75
const WIDTH = window.innerWidth - BALL_RADIUS*2
const HEIGHT = window.innerHeight - BALL_RADIUS*2
let holePosX, holePosY
let gammaMin, gammaMax;
let betaMax, betaMin; 
let baseGamma = undefined
let baseBeta = undefined
let score = 0

let ballObj = new Ball(5, 5, BALL_RADIUS*2)
let blackhole = new Blackhole(300, 100, 100)
let timer = new Timer()


export const generateHoleCoords = () => {
    const maxPosX = WIDTH - 160
    const maxPosY = HEIGHT - 160
    holePosX = Math.random() * ( maxPosX - 200 ) + 200
    holePosY = Math.random() * ( maxPosY - 200 ) + 200

    hole.style.left = holePosX + 'px'
    hole.style.top = holePosY + 'px'
}

const checkBallInTheHole = (p1x, p1y, r1, p2x, p2y, r2) => {
    const a = (p1x - p2x) ** 2
    const b = (p1y - p2y) ** 2
    const c = (r1 + r2 - BALL_RADIUS * 2) ** 2 
    const isInTheHole = c > a + b

    return isInTheHole
}

const checkGameEnd = (score, isConsumed) => {
    const win = score === 10
    if(win || isConsumed) {
        timer.stop(win)
        if(win){
            alert(`
                YOU WON!
                Your time: ${timer.time}
                Records: 
                ${timer.records}
            `)
            wrapper.style.display = 'none'
            startBtn.style.display = 'block'
            ballElement.style.display = 'none'
        }

        if(isConsumed) {
            alert(`
                YOU LOST!
                The black hole consumed you :(
            `)
            wrapper.style.display = 'none'
            startBtn.style.display = 'block'
            ballElement.style.display = 'none'
        }
        return true
    }
    return false
}

export const animateBallMovement = () => {
    if(!timer.active) {
        timer.start()
    }
    const isConsumed = checkBallInBlackHole()

    if(checkBallInTheHole(
        holePosX + BLACKHOLE_RADIUS, 
        holePosY + BLACKHOLE_RADIUS, 
        BLACKHOLE_RADIUS, 
        ballObj.pos.x + BALL_RADIUS, 
        ballObj.pos.y + BALL_RADIUS, 
        BALL_RADIUS)) {
        generateHoleCoords()
        score++
    }  

    ballObj.update()
    ballObj.edges(WIDTH, HEIGHT)
    blackhole.pull(ballObj)

    ballElement.style.left = ballObj.pos.x + 'px'
    ballElement.style.top = ballObj.pos.y + 'px';

    !checkGameEnd(score, isConsumed) && requestAnimationFrame(animateBallMovement)
}

const checkBallInBlackHole = () => {
    let isIn = checkBallInTheHole(
        blackhole.pos.x + BLACKHOLE_RADIUS, 
        blackhole.pos.y + BLACKHOLE_RADIUS,
        BLACKHOLE_RADIUS, 
        ballObj.pos.x + BALL_RADIUS,
        ballObj.pos.y + BALL_RADIUS, 
        BALL_RADIUS)

    if(isIn) {
        console.log(timer.time)
    }
    return isIn
}

window.addEventListener('deviceorientation', e => {
    if(baseGamma === undefined && baseBeta === undefined) {
        baseGamma = e.gamma
        baseBeta = e.beta

        gammaMax = baseGamma + 80 
        gammaMin = baseGamma - 80 

        betaMax = baseBeta + 80 
        betaMin = baseBeta - 80 
    }
    let xvel = map(e.gamma, -90, 90, -10, 10, true)
    let yvel = map(e.beta, -90, 90, -10, 10, true)

    ballObj.vel = new Vector(xvel, yvel)
})

const getStats = () => {
    info.innerHTML = `
        x: ${ballObj.pos.x}<br/>
        y: ${ballObj.pos.y}<br/>
        vel-x: ${ballObj.vel.x}<br/>
        vel-y: ${ballObj.vel.y}<br/>
        acc-x: ${ballObj.acc.x}<br/>
        acc-y: ${ballObj.acc.y}<br/>
        mag: ${Vector.substract(ballObj.pos, blackhole.pos).magnitude()}<br/>
    ` 
}