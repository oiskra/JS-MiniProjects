
export default class Vector {
    constructor(x,y) {
        this.posX = x
        this.posY = y
    }

    static substract(v1, v2) {
        v1.sub(v2);
        return v1
    }

    static divide(v1, num) {
        //standard division
        return new Vector(v1.posX / num, v1.posY / num)
    }

    add(v) {
        this.posX += v.posX
        this.posY += v.posY

        return this
    }

    sub(x,y) {
        if (x instanceof Vector) {
            this.posX -= x.posX || 0;
            this.posY -= x.posY || 0;
            return this;
        }

        this.posX -= x || 0;
        this.posY -= y || 0;
        return this;
    }

    mag() {
        //a2+b2=c2
        //from posx & posy
        //calc c
        return Math.sqrt(this.posX ** 2 + this.posY ** 2)
    }

    setMag(num) {
        return this.normalize().mult(num)
    }

    mult(num) {
        this.posX *= num
        this.posY *= num

        return this
    }

    normalize() {
        const len = this.mag()

        if (len !== 0) this.mult((1 / len))
        return this
    }
}
