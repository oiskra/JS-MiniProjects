
import Ball from "./ball.js";
import Blackhole from "./blackhole.js";
import Vector from "./vector.js";
import { map } from "./helperFunctions.js";

const ball = document.querySelector('#ball')
const hole = document.querySelector('#hole')
const blackHoleElement = document.querySelector('.black-hole')
const info = document.querySelector('#info')
const width = window.innerWidth - 100;
const height = window.innerHeight - 100
let holePosX, holePosY
let gammaMin, gammaMax;
let betaMax, betaMin; 
let baseGamma = undefined
let baseBeta = undefined


let ballObj = new Ball(5, 5, 300)
let blackhole = new Blackhole(300, 100, 50)

export const generateHoleCoords = () => {
    const maxPoxX = width - 160
    const maxPoxY = height - 160
    holePosX = Math.random() * ( maxPoxX - 200 ) + 200
    holePosY = Math.random() * ( maxPoxY - 200 ) + 200

    hole.style.left = holePosX + 'px'
    hole.style.top = holePosY + 'px'
}

const checkBallInTheHole = (p1x, p1y, r1, p2x, p2y, r2) => {
    const a = (p1x - p2x) ** 2
    const b = (p1y - p2y) ** 2
    const c = (r1 + r2 - 100) ** 2 
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
    ` 
    if(checkBallInTheHole(holePosX+75, holePosY+75, 75, ballObj.pos.x+50, ballObj.pos.y+50, 50)){
        newLevel()
    }  
    
    ballObj.update()
    ballObj.edges(width, height)
    blackhole.pull(ballObj)

    ball.style.left = ballObj.pos.x + 'px'
    ball.style.top = ballObj.pos.y + 'px'

    !checkBallInBlackHole() && requestAnimationFrame(animateBallMovement)
}
requestAnimationFrame(animateBallMovement)

const checkBallInBlackHole = () => {
    let isIn = checkBallInTheHole(
        blackhole.pos.x + 75, 
        blackhole.pos.y + 75,
        75, 
        ballObj.pos.x+50,
        ballObj.pos.y+50, 
        50)

    if(isIn) {
        ball.style.display = 'none'
        alert('consumed by blackhole')
    }
    return isIn
}

const resetBall = () => {
    ball.style.left = '5px'
    ball.style.top = '5px'
} 

const newLevel = () => {
    resetBall()
    generateHoleCoords()
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
    let xacc = map(e.gamma, -90, 90, -500, 500, true)
    let xaccV = new Vector(xacc, 0)
    ballObj.applyForce(xaccV)
    // speedX = e.gamma >= gammaMax ? 
    //     10 : e.gamma <= gammaMin ? 
    //     -10 : ((baseGamma - e.gamma)/9) * (-1)  
    let yacc = map(e.beta, -90, 90, -500, 500, true)
    let yaccV = new Vector(0, yacc)
    ballObj.applyForce(yaccV)
    // speedY = e.beta >= betaMax ? 
    //     10 : e.beta <= betaMin ? 
    //     -10 : ((baseBeta - e.beta)/9) * (-1)

    console.log(xacc)
    console.log(yacc)


})
