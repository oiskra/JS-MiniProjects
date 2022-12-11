import Ball from "./ball.js";
import CursorEffect from "./cursorEffect.js";
import { random } from "./helperFunctions.js";

const WIDTH = 1000;
const HEIGHT = 600;

const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const amountSlider = document.querySelector('#ball-amount');
const connectingLineSlider = document.querySelector('#connecting-line');
const pullEffectCheckBox = document.querySelector('#pull-effect');
const agarioModeCheckBox = document.querySelector('#agario-mode');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let ballArr = [];
let animationOn = false; 
let pullEffectOn = pullEffectCheckBox.checked;
let agarioModeOn = agarioModeCheckBox.checked;
const cursorEffect = new CursorEffect(75);

const setup = () => {
    ballArr = []
    pullEffectOn = pullEffectCheckBox.checked;
    agarioModeOn = agarioModeCheckBox.checked;
    for (let i = 0; i < parseInt(amountSlider.value); i++) {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ballArr.push(new Ball(i,x,y,random(5,15),ctx)) 
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
                agarioModeOn && ballArr[i].consume(ballArr[j], (ball) => {
                    const toDelete = ballArr.find((el) => el.id == ball.id) 
                    ballArr.splice(ballArr.indexOf(toDelete), 1);
                })
            }    
        }
        ballArr[i].show();
        ballArr[i].update();
        ballArr[i].edges(WIDTH, HEIGHT);
        pullEffectOn && cursorEffect.pull(ballArr[i]);
    }
    requestAnimationFrame(draw);
}

startBtn.addEventListener('click', (e) => {
    setup();
    ballArr.forEach(ball => ball.setRandomVelocity());
    e.target.setAttribute('disabled', null)
    !animationOn && draw();
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
    })
})



