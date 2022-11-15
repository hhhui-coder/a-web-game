// 生成飞机
var plane = new Plane();

// 保存键盘事件移动方向
var left = false,
    right = false,
    up = false,
    down = false;
    space = false;

// 保存子弹
var bullets = []

// 保存敌人
var enemies = {
    direction: CONFIG.enemyDirection,
    isBottom: false,
    enemyArr: []
}
var dieEnemies = []

// 保存分数
var scoreNum = 0;

//关卡信息
var level = CONFIG.level;
var numPerLine = CONFIG.numPerLine;

// 生成敌人
function createEnemies() {
    for (var i = 0; i < level; i++) {
        for (var j = 0; j < numPerLine; j++) {
            var x = CONFIG.canvasPadding + j * (CONFIG.enemySize + CONFIG.enemyGap)
            var y = CONFIG.canvasPadding + i * (CONFIG.enemySize + CONFIG.enemyGap)
            enemies.enemyArr.push(new Enemy(x, y))
        }
    }
}

console.log(enemies)

window.addEventListener('keydown', function (e) {

    // console.log(e)
    var key = e.keyCode || e.width || e.charCode;
    switch (key) {
        case 37://左
            left = true;
            break;
        case 39://右
            right = true;
            break;
        case 38://上
            up = true;
            break;
        case 40://下
            down = true;
            break;
        case 32://空格
            space = true;
            break;
    }

}, false)

window.addEventListener('keyup', function (e) {
    var key = e.keyCode || e.width || e.charCode;
    switch (key) {
        case 37:
            left = false;
            break;
        case 39:
            right = false;
            break;
        case 38:
            up = false;
            break;
        case 40:
            down = false;
            break;
        case 32:
            space = false;
            break;
    }
}, false)

// 飞机动画
function planeAnimate() {

    //设置碰撞检测，飞机碰撞时移动关闭
    if (plane.x + plane.size.width > canvas.width - CONFIG.canvasPadding) {
        right = false;
    } else if (plane.x < CONFIG.canvasPadding) {
        left = false;
    }

    //当其中一个条件为true时，则执行当前函数（移动对应方向）
    if (left) {
        plane.x -= plane.speed;
    } else if (right) {
        plane.x += plane.speed;
    }
    if(up){
        plane.y -= plane.speed;
    }else if(down){
        plane.y += plane.speed;
    }

    // 生成子弹
    if (space) {
        var bullet = new Bullet(plane.x + plane.size.width / 2, plane.y, CONFIG.bulletSize, CONFIG.bulletSpeed)
        bullets.push(bullet)
    }

    // 绘制飞机
    plane.draw();

}

// 敌人动画
function enemyAnimate() {

    // 绘制敌人
    enemies.enemyArr.forEach(function (item) {

        item.draw();

    })

    // 敌人左右移动
    if (enemies.direction === 'right') {
        enemies.enemyArr.forEach(function (item) {

            item.x += item.speed;

            // 敌人的墙壁碰撞检测
            if (item.x > canvas.width - CONFIG.canvasPadding - item.size) {
                enemies.direction = 'left';
                enemies.isBottom = true;
            }

        })
    } else if (enemies.direction === 'left') {
        enemies.enemyArr.forEach(function (item) {

            item.x -= item.speed;

            // 敌人的墙壁碰撞检测
            if (item.x < CONFIG.canvasPadding) {
                enemies.direction = 'right';
                enemies.isBottom = true;
            }

        })
    }

    // 敌人向下移动
    if (enemies.isBottom) {

        enemies.enemyArr.forEach(function (item) {

            item.y += item.size + item.gap;

            // 游戏结束
            if (item.y + item.size > canvas.height - plane.size.height - CONFIG.canvasPadding) {
                plane.isLive = false;
            }

        })
        enemies.isBottom = false;

    }

    // 敌人死亡
    for (var i in enemies.enemyArr) {
        var enemy = enemies.enemyArr[i];

        if (enemy.isLive) {

            for (var j in bullets) {
                var bullet = bullets[j];

                if (enemy.x + enemy.size > bullet.x + 1 &&
                    enemy.x < bullet.x &&
                    enemy.y + enemy.size > bullet.y + bullet.size &&
                    enemy.y < bullet.y) {

                    enemy.isLive = false;
                    dieEnemies.push(enemy);
                    bullets.splice(j, 1);

                }

            }

        } else {
            enemies.enemyArr.splice(i, 1);
            scoreNum++;
        }
    }

}

// 怪兽死亡动画
function enemyDie() {

    dieEnemies.forEach(function (item) {
        item.boom();
        item.dieTime--;
    })
    for (var i in dieEnemies) {
        var enemy = dieEnemies[i];
        if (enemy.dieTime < 0) {
            dieEnemies.splice(i, 1);
        }
    }

}

// 子弹动画
function bulletAnimate() {

    // 绘制子弹
    bullets.forEach(function (item) {
        item.moveUp();
    })

}

// 分数动画
function scoreText() {
    var str = '得分：' + scoreNum;
    drawText(20, 20, str)
}

//重置
function reset() {
    enemies = {
        direction: CONFIG.enemyDirection,
        isBottom: false,
        enemyArr: []
    }
    bullets = [];
    dieEnemies = [];
}

// 总动画
function animate() {

    clear(0, 0, canvas);

    if (!plane.isLive) {
        reset();
        GAME.failed();
        return
    }

    if (enemies.enemyArr.length === 0) {
        reset();
        level++;
        if (level > CONFIG.totalLevel) {
            reset();
            GAME.allSuccess();
            level = 1;
            scoreNum = 0;
            return
        }
        GAME.success();
        return
    }

    scoreText();

    planeAnimate();

    bulletAnimate();

    enemyAnimate();

    enemyDie();

    requestAnimationFrame(animate);

}