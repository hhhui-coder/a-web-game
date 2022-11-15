/**
 * 分析飞机：
 * 1. 怪兽随着时间移动
 * 2. 怪兽死亡绽放烟花
 */

function Enemy(x, y) {
    Parent.call(this, x, y, CONFIG.enemySize, CONFIG.enemySpeed);
    this.gap = CONFIG.enemyGap;
    this.icon = CONFIG.enemyIcon;
    this.boomIcon = CONFIG.enemyBoomIcon;
    this.dieTime = 10;
}

inheritPrototype(Enemy, Parent);

/**
 * 绘图
 */
Enemy.prototype.draw = function () {
    drawImage(this.x, this.y, this.size, this.icon);
}

Enemy.prototype.boom = function(){
    drawImage(this.x, this.y, this.size, this.boomIcon);
}

