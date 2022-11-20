new p5()


export default class Blackhole {

    constructor(x,y,m) {
        this.pos = createVector(x,y)
        this.mass = m
    }


    pull(ball) {
        let force = p5.Vector.sub(this.pos, ball.pos)
        let dist = constrain(force.mag(), 50, 500)
        
        let G = 10

        let strength = G * (ball.mass * this.mass) / (dist**2)
        console.log({dist, strength})

        force.setMag(strength)
        ball.applyForce(force)

    }
}