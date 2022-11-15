/**
 * 父类，敌人，子弹，飞机的共同性
 * 1. 都有坐标
 * 2. 都有大小
 * 3. 都会移动
 * 4. 都会死亡
 */

function Parent(x, y, size, speed){
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.isLive = true;
}

/**
 * 移动，改变飞机的坐标
 */
Parent.prototype.move = function(x, y){
    this.x = x;
    this.y = y;
}

Parent.prototype.die = function(){
    this.isLive = true
}

function inheritPrototype(subType,superType){
    var protoType = Object.create(superType.prototype);
    protoType.constructor = subType;
    subType.prototype = protoType;
}