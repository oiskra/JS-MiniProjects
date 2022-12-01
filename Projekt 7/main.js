import Ball from "./ball.js";
import { random } from "./helperFunctions.js";

const WIDTH = 1000;
const HEIGHT = 600;
const QTY = 20;

const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')
const amountSlider = document.querySelector('#ball-amount')
const neighbourLineSlider = document.querySelector('#neighbour-line')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

let ballArr = [];
let animationOn = false; 

const setup = () => {
    ballArr = []
    console.log(amountSlider.value)
    for (let i = 0; i < parseInt(amountSlider.value); i++) {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ballArr.push(new Ball(i,x,y,5,ctx)) 
        ballArr[i].neighbourLine = neighbourLineSlider.value;  
    }
    console.table(ballArr)
}

const draw = () => {
    animationOn = true;
    ctx.clearRect(0,0, WIDTH, HEIGHT);
    
    for (let i = 0; i < ballArr.length; i++) {
        for (let j = i; j < ballArr.length; j++) {
            if(ballArr[i].id !== ballArr[j].id) {
                ballArr[i].connect(ballArr[j])
            }    
        }
        ballArr[i].show();
        ballArr[i].update();
        ballArr[i].edges(WIDTH, HEIGHT);
    }

    requestAnimationFrame(draw);
}

startBtn.addEventListener('click', (e) => {
    setup();
    ballArr.forEach(ball => {
        const vx = random(-1,1);
        const vy = random(-1,1);
        ball.velX = vx;
        ball.velY = vy;
    });
    !animationOn && draw();
    e.target.setAttribute('disabled', null)
});

resetBtn.addEventListener('click', () => {
    setup();
    ballArr.forEach(ball => {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ball.x = x;
        ball.y = y;   
        const vx = random(-1,1);
        const vy = random(-1,1);
        ball.velX = vx;
        ball.velY = vy;  
    });

    !animationOn && draw();
});

