/**
 * 分析飞机：
 * 1. 飞机通过键盘操作移动
 * 2. 飞机可以发射子弹
 * 3. 飞机死亡
 */

function Plane() {
    Parent.call(this, canvas.width / 2 - CONFIG.planeSize.width / 2, canvas.height - CONFIG.planeSize.height - CONFIG.canvasPadding, CONFIG.planeSize, CONFIG.planeSpeed)
    this.icon = CONFIG.planeIcon;
}

inheritPrototype(Plane, Parent);

/**
 * 绘图
 */
Plane.prototype.draw = function () {
    drawImage(this.x, this.y, this.size, this.icon);
}

Plane.prototype.init = function() {
    this.x = canvas.width / 2 - CONFIG.planeSize.width / 2;
    this.y = canvas.height - plane.size.height - CONFIG.canvasPadding;
}