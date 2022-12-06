import Ball from "./ball.js";
import CursorEffect from "./cursorEffect.js";
import { random } from "./helperFunctions.js";

const WIDTH = 1000;
const HEIGHT = 600;

const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')
const amountSlider = document.querySelector('#ball-amount')
const connectingLineSlider = document.querySelector('#connecting-line')
const pullEffectCheckBox = document.querySelector('#pull-effect')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

let ballArr = [];
let animationOn = false; 
let pullEffectOn = pullEffectCheckBox.checked;
const cursorEffect = new CursorEffect(75);

const setup = () => {
    ballArr = []
    pullEffectOn = pullEffectCheckBox.checked;
    for (let i = 0; i < parseInt(amountSlider.value); i++) {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ballArr.push(new Ball(i,x,y,5,ctx)) 
        ballArr[i].neighbourLine = connectingLineSlider.value;  
    }

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
        pullEffectOn && cursorEffect.pull(ballArr[i]);
    }

    ctx.beginPath();
    ctx.arc(cursorEffect.x, cursorEffect.y, cursorEffect.r, 0, Math.PI*2)
    ctx.stroke()

    requestAnimationFrame(draw);
}

startBtn.addEventListener('click', (e) => {
    setup();
    ballArr.forEach(ball => ball.setRandomVelocity());
    !animationOn && draw();
    e.target.setAttribute('disabled', null)
});

resetBtn.addEventListener('click', () => {
    setup();
    ballArr.forEach(ball => {
        ball.setRandomPosition(WIDTH,HEIGHT);
        ball.setRandomVelocity();
    });

    !animationOn && draw();
});

canvas.addEventListener('mousemove', (e) => {
    cursorEffect.x = e.clientX - 10;
    cursorEffect.y = e.clientY - 10;
})
canvas.addEventListener('click', () => {
    ballArr.forEach(ball => {
        cursorEffect.multiplyOnClick(ball, ballArr)
        ball.neighbourLine = connectingLineSlider.value; 
        console.log(ballArr)
    })
})



