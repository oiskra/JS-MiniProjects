

export default class Ball {
    constructor(x,y,r,ctx) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velX = 1;
        this.velY = 1;
        this.ctx = ctx;
    }

    connect(ball) {
        const a = this.x - ball.x
        const b = this.y - ball.y
        const c = Math.sqrt(a**2 + b**2)

        if(c <= 200) {
            this.ctx.moveTo(this.x,this.y)
            this.ctx.lineTo(ball.x, ball.y)
            this.ctx.stroke()

        }
    }

    edges(w,h) {
        if(this.y <= 0) {
            this.y = 0
            this.velY *= -1
        }
        else if(this.y >= h) {
            this.y = h
            this.velY *= -1
        }
        if(this.x <= 0) {
            this.x = 0
            this.velX *= -1
        }
        else if(this.x >= w ) {
            this.x = w
            this.velX *= -1
        }
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    show() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();        
    }
}