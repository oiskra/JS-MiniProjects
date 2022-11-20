
export default class Vector {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    static substract(v1, v2) {
        let newV = new Vector(v1.x, v1.y)
        newV.x -= v2.x || 0
        newV.y -= v2.y || 0
        return newV
    }

    static divide(v1, n) {
        let newV = new Vector(v1.x, v1.y)
        newV.x /= n
        newV.y /= n
        return newV
    }

    add(v) {
        this.x += v.x
        this.y += v.y

        return this
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    setMag(num) {
        return this.normalize().mult(num)
    }

    mult(num) {
        this.x *= num
        this.y *= num

        return this
    }

    normalize() {
        const len = this.mag()

        if (len !== 0) this.mult((1 / len))
        return this
    }

    set(x,y) {
        this.x = x
        this.y = y
    }
}
