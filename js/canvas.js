var canvas = document.querySelector('#canvas')
var ctx = canvas.getContext('2d')

/**
 * 绘图
 * @param {number} x 
 * @param {number} y 
 * @param {object} size 
 * @param {url} img 
 */
function drawImage(x, y, size, img) {

    var image = new Image();
    image.src = img

    // image.onload = function () {
        if (typeof size !== 'object') {
            ctx.drawImage(image,x, y, size, size)
        } else {
            ctx.drawImage(image,x, y, size.width, size.height)
        }
    // }

}

/**
 * 绘直线
 * @param {number} x 
 * @param {number} y 
 * @param {number} size 
 */
function drawLine(x, y, size) {

    ctx.strokeStyle = '#fff';

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y-size);
    ctx.stroke();
    ctx.closePath();
    // ctx.fill();

}

/**
 * 擦除
 * @param {number} x 
 * @param {number} y 
 * @param {object || number} size 
 */
function clear(x, y, size) {

    var s = null;
    if (typeof size !== 'object') {
        ctx.clearRect(x, y, size, size)
    } else {
        ctx.clearRect(x, y, size.width, size.height)
    }

}


/**
 * 文字
 */
function drawText(x, y, str) {

    ctx.font = '18px 黑体';
    ctx.fillStyle = '#fff';
    ctx.fillText(str, x, y);

}