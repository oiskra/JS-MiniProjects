'use strict'

import Ball from "./ball.js";
import Blackhole from "./blackHole.js";

const ball = document.querySelector('#ball')
const hole = document.querySelector('#hole')
const blackHoleElement = document.querySelector('.black-hole')
const width = window.innerWidth - 100;
const height = window.innerHeight - 100
let speedX, speedY
let holePosX, holePosY
let gammaMin, gammaMax;
let betaMax, betaMin; 
let baseGamma = undefined
let baseBeta = undefined


let ballObj = new Ball(55, 55, 50)
let blackhole = new Blackhole(350, 150, 50)

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

    if(checkBallInTheHole(holePosX+75, holePosY+75, 75, ballObj.pos.x+50, ballObj.pos.y+50, 50)){
        newLevel()
    }  
    ballObj.update()
    ballObj.edges(width, height)
    blackhole.pull(ballObj)

    ball.style.left = ballObj.pos.x + 'px'
    ball.style.top = ballObj.pos.y + 'px'

    requestAnimationFrame(animateBallMovement)
}

const resetBall = () => {
    ball.style.left = '5px'
    ball.style.top = '5px'
} 

const newLevel = () => {
    resetBall()
    generateHoleCoords()
}


// window.addEventListener('deviceorientation', e => {
//     if(baseGamma === undefined && baseBeta === undefined) {
//         baseGamma = e.gamma
//         baseBeta = e.beta

//         gammaMax = baseGamma + 80 
//         gammaMin = baseGamma - 80 

//         betaMax = baseBeta + 80 
//         betaMin = baseBeta - 80 
//     }
    
//     speedX = e.gamma >= gammaMax ? 
//         10 : e.gamma <= gammaMin ? 
//         -10 : ((baseGamma - e.gamma)/9) * (-1)  
        
//     speedY = e.beta >= betaMax ? 
//         10 : e.beta <= betaMin ? 
//         -10 : ((baseBeta - e.beta)/9) * (-1)

// })
