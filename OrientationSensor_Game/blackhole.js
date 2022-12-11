import Vector from "./vector.js";
import { constrain } from './helperFunctions.js';


export default class Blackhole {

    constructor(x,y,m) {
        this.pos = new Vector(x,y);
        this.vel = new Vector(1,1);
        this.mass = m;
    }

    pull(ball) {
        let force = Vector.substract(this.pos, ball.pos);
        let dist = constrain(force.magnitude(), 50, 400);
        let G = 10;
        if(dist === 400) G = 0;
        let strength = G * (ball.mass * this.mass) / (dist**2);

        force.setMagnitude(strength);
        ball.applyForce(force);
    }

    update() {
        this.pos.add(this.vel);
    }

    edges(w,h) {
        if(this.pos.y <= 0) {
            this.pos.y = 0;
            this.vel.y *= -1;
        }
        else if(this.pos.y >= h) {
            this.pos.y = h;
            this.vel.y *= -1;
        }
        if(this.pos.x <= 0) {
            this.pos.x = 0;
            this.vel.x *= -1;
        }
        else if(this.pos.x >= w ) {
            this.pos.x = w;
            this.vel.x *= -1;
        }
    }


}