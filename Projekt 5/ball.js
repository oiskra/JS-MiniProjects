import Vector from "./vector.js";

export default class Ball {
    constructor(x, y, m) {
        this.pos = createVector(x,y)
        this.vel = p5.Vector.random2D()
        this.acc = createVector(0,0)
        this.mass = m
    }

    update() {
        this.vel.add(this.acc)
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
        let f = p5.Vector.div(force, this.mass)
        this.acc.add(f)
        
    }
}