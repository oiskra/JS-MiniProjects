import Ball from "./ball.js";
import { random } from "./helperFunctions.js"

export default class CursorEffect {
    constructor(effectRadius) {
        this.x = 0;
        this.y = 0;
        this.r = effectRadius;
    }

    pull(ball) {
        const newX = this.x - ball.x;
        const newY = this.y - ball.y;
        const dist = Math.sqrt(newX ** 2 + newY ** 2);

        if(dist <= this.r){
            const pullDirectionX = newX / dist;
            const pullDirectionY = newY / dist;
            ball.x += pullDirectionX * 3;
            ball.y += pullDirectionY * 3;
        }
    }

    multiplyOnClick(ball, ballArr) {
        const clickRadius = 1;
        const a = this.x - ball.x;
        const b = this.y - ball.y;
        const c = (ball.r-clickRadius);
        const onBall = c**2>a**2 + b**2;

        if(onBall){
            ball.setRandomPosition(1000,600);
            const newBall = new Ball(
                ballArr.length, 
                random(1000),
                random(600),
                ball.r,
                ball.ctx);
            newBall.setRandomVelocity();
            ballArr.push(newBall);
        }
        return;
    }

}