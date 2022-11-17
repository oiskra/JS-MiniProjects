const ball = document.querySelector('#ball')
const width = window.innerWidth - 100;
const height = window.innerHeight - 100
let posX = 0
let posY = 0
let speedX = 0
let speedY = 0
let gammaMin, gammaMax;
let betaMax, betaMin; 
let baseGamma = undefined
let baseBeta = undefined

const animateBallMovement = () => {
    if(posX <= width && posY >= 0) posX += speedX
    if(posY <= height && posY >= 0) posY += speedY
    
    ball.style.left = posX + 'px'
    ball.style.top = posY + 'px'

    requestAnimationFrame(animateBallMovement)
}
requestAnimationFrame(animateBallMovement)


window.addEventListener('deviceorientation', e => {
    if(baseGamma === undefined && baseBeta === undefined) {
        baseGamma = e.gamma
        baseBeta = e.beta

        console.log('baseA', baseGamma)
        console.log('baseB', baseBeta)

        gammaMax = baseGamma + 80 // -50 base: 40 
        gammaMin = baseGamma - 80 // 130 base: 40

        betaMax = baseBeta + 80 //90
        betaMin = baseBeta - 80 //-90
    }
    
    speedX = e.gamma >= gammaMax ? 
        10 : e.gamma <= gammaMin ? 
        -10 : ((baseGamma - e.gamma)/9) * (-1)  
        
    speedY = e.beta >= betaMax ? 
        10 : e.beta <= betaMin ? 
        -10 : ((baseBeta - e.beta)/9) * (-1)
    
    console.log('X',{
        speedX,
        posX,
        gamma: e.gamma,

    })
    console.log('Y',{
        speedY,
        posY,
        beta: e.beta
    })
})