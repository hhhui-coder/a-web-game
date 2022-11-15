/**
 * 子弹
 * 1.移动；
 * 2.碰撞；
 */

/**
 * 子弹
 * @param {*} x 
 * @param {*} y 
 */

function Bullet(x, y, size, speed) {
    Parent.call(this, x, y, size, speed)

}

inheritPrototype(Bullet, Parent)

Bullet.prototype.draw = function () {
    drawLine(this.x, this.y, this.size);
}

Bullet.prototype.moveUp = function () {
    if(!this.isLive){
        return ''
    }
    this.move(this.x, this.y - this.speed, this.size)
    this.draw()
    if(this.y <= 0){
        this.isLive = false;
    }
}