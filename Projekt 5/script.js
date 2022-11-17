const ball = document.querySelector('#ball')
const width = window.innerWidth - 100;
const height = window.innerHeight - 100
let posX = 0
let posY = 0
let speedX = 5
let speedY = 5


const animateBallMovement = () => {
    if(posX >= width || posX < 0) speedX *= (-1)
    if(posY >= height || posY < 0) speedY *= (-1)
    
    posX += speedX
    posY += speedY
    ball.style.left = posX + 'px'
    ball.style.top = posY + 'px'
    requestAnimationFrame(animateBallMovement)
}
requestAnimationFrame(animateBallMovement)
