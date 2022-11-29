
import Ball from "./ball.js"
import Blackhole from "./blackhole.js"
import Vector from "./vector.js"
import Timer from "./timer.js"
import { map } from "./helperFunctions.js"

const ball = document.querySelector('#ball')
const hole = document.querySelector('#hole')
const blackHoleElement = document.querySelector('.black-hole')
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
let activeTime = false

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

export const animateBallMovement = () => {
    info.innerHTML = `
        x: ${ballObj.pos.x}<br/>
        y: ${ballObj.pos.y}<br/>
        vel-x: ${ballObj.vel.x}<br/>
        vel-y: ${ballObj.vel.y}<br/>
        acc-x: ${ballObj.acc.x}<br/>
        acc-y: ${ballObj.acc.y}<br/>
        mag: ${Vector.substract(ballObj.pos, blackhole.pos).magnitude()}<br/>
    `     
    if(!activeTime) {
        timer.start()
        activeTime = true
    }

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

    ball.style.left = ballObj.pos.x + 'px'
    ball.style.top = ballObj.pos.y + 'px';

    (!checkBallInBlackHole() && score < 10) && requestAnimationFrame(animateBallMovement)
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
        ball.style.display = 'none'
        alert('consumed by blackhole')
        timer.stop()
        activeTime = false
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
