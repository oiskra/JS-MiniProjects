const ball = document.querySelector('#ball')
const width = window.innerWidth - 100;
const height = window.innerHeight - 100
let posX = 0
let posY = 0
let speedX = 0
let speedY = 0
let alphaMin, alphaMax;
let betaMax, betaMin; 
let baseAlpha = undefined
let baseBeta = undefined

const animateBallMovement = () => {
    if(posX >= width || posX < 0) speedX = 0
    if(posY >= height || posY < 0) speedY = 0
    
    posX += speedX
    //posY += speedY
    ball.style.left = posX + 'px'
    //ball.style.top = posY + 'px'
    requestAnimationFrame(animateBallMovement)
}
requestAnimationFrame(animateBallMovement)


window.addEventListener('deviceorientation', e => {
    if(baseAlpha === undefined && baseBeta === undefined) {
        baseAlpha = e.alpha
        baseBeta = e.beta

        console.log('baseA',baseAlpha)
        console.log('baseB',baseBeta)

        alphaMax = baseAlpha + 90
        alphaMin = baseAlpha - 90

        betaMax = baseBeta + 90
        betaMin = baseBeta - 90
    }
    speedX = speedX < 0 ? -5 : 5

    // speedX = e.alpha > alphaMax ? 10 : 5  
    // speedX = e.alpha < alphaMin ? 10 : 5  
    
    speedY = e.beta > betaMax ? 10 : e.beta/9  
    speedY = e.beta < betaMin ? 10 : e.beta/9  

    console.log('xspeed',speedX)
    console.log('yspeed',speedY)

})