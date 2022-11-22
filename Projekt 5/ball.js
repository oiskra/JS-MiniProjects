import Vector from "./vector.js";
import { constrain } from "./helperFunctions.js";

export default class Ball {
    constructor(x, y, m) {
        this.pos = new Vector(x,y)
        this.vel = new Vector(0,0)
        this.acc = new Vector(0,0)
        this.mass = m
    }

    update() {
        let newVel = Vector.add(this.vel, this.acc)
        let velX = constrain(newVel.x, -10, 10)
        let velY = constrain(newVel.y, -10, 10)
        this.vel.set(velX, velY)
        this.pos.add(this.vel)
        this.acc.set(0,0)
    }

    edges(w,h) {
        if(this.pos.y <= 0) {
            this.pos.y = 0
            this.vel.y *= -1
        }
        else if(this.pos.y >= h) {
            this.pos.y = h
            this.vel.y *= -1
        }
        if(this.pos.x <= 0) {
            this.pos.x = 0
            this.vel.x *= -1
        }
        else if(this.pos.x >= w ) {
            this.pos.x = w
            this.vel.x *= -1
        }

    }

    applyForce(force) {
        let f = Vector.divide(force, this.mass)
        this.acc.add(f)   
    }
}