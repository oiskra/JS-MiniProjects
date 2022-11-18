const ball = document.querySelector('#ball')
const hole = document.querySelector('#hole')
const width = window.innerWidth - 100;
const height = window.innerHeight - 100
let posX = 0
let posY = 0
let holePosX, holePosY
let speedX = 0
let speedY = 0
let gammaMin, gammaMax;
let betaMax, betaMin; 
let baseGamma = undefined
let baseBeta = undefined


export const generateHoleCoords = () => {
    const maxPoxX = width - 160
    const maxPoxY = height - 160
    holePosX = Math.random() * ( maxPoxX - 200 ) + 200
    holePosY = Math.random() * ( maxPoxY - 200 ) + 200

    hole.style.left = holePosX + 'px'
    hole.style.top = holePosY + 'px'
}

const checkCollision = (p1x, p1y, r1, p2x, p2y, r2) => {
    const a = (p1x - p2x) ** 2
    const b = (p1y - p2y) ** 2
    const c = (r1 + r2) ** 2 
    const isColliding = c > a + b

    return isColliding
}

const checkBallInTheHole = (p1x, p1y, r1, p2x, p2y, r2) => {
    const a = (p1x - p2x) ** 2
    const b = (p1y - p2y) ** 2
    const c = (r1 + r2 - 100) ** 2 
    const isColliding = c > a + b

    return isColliding
}

const animateBallMovement = () => {
    // if(posX < width && posY > 0) posX += speedX
    // if(posY < height && posY > 0) posY += speedY

    if(checkBallInTheHole(holePosX+75, holePosY+75, 75, posX+50, posY+50, 50)){
        newLevel()
        requestAnimationFrame(animateBallMovement)
    }
    
    posX += speedX
    posY += speedY
    ball.style.left = posX + 'px'
    ball.style.top = posY + 'px'

    requestAnimationFrame(animateBallMovement)
}
requestAnimationFrame(animateBallMovement)
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
    
    speedX = e.gamma >= gammaMax ? 
        10 : e.gamma <= gammaMin ? 
        -10 : ((baseGamma - e.gamma)/9) * (-1)  
        
    speedY = e.beta >= betaMax ? 
        10 : e.beta <= betaMin ? 
        -10 : ((baseBeta - e.beta)/9) * (-1)

})
