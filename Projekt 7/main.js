import Ball from "./ball.js";
import { random } from "./helperFunctions.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1000;
const HEIGHT = 600;
const QTY = 10;


const ball = new Ball(50,50,50,ctx);
const ballArr = [];

const setup = () => {
    for (let i = 0; i < QTY; i++) {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ballArr.push(new Ball(x,y,10,ctx))   
    }
}
setup();
console.log(ballArr)
const draw = () => {
    ctx.clearRect(0,0, WIDTH, HEIGHT);
    
    for (let i = 0; i < ballArr.length; i++) {
        const element = ballArr[i];
        for (let j = 0; j < ballArr.length; j++) {
            if(ballArr[i] !== ballArr[j]) {
                ballArr[i].connect(ballArr[j])
            }    
        }
        ballArr[i].show();
        ballArr[i].update();
        ballArr[i].edges(WIDTH, HEIGHT);
    }

    

    
    requestAnimationFrame(draw);
}

draw();