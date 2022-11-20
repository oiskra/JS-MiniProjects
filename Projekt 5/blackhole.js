import Vector from "./vector.js"
import {constrain} from './helperFunctions.js'


export default class Blackhole {

    constructor(x,y,m) {
        this.pos = new Vector(x,y)
        this.mass = m
    }


    pull(ball) {
        let force = Vector.substract(this.pos, ball.pos)
        let dist = constrain(force.mag(), 50, 400)
        console.log(dist)
        
        let G = 10

        let strength = G * (ball.mass * this.mass) / (dist**2)
        console.log({force,dist, strength})

        force.setMag(strength)
        ball.applyForce(force)
    }
}