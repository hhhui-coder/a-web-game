// 元素
var container = document.getElementById('game');

/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
  init: function (opts) {
    // this.status = 'start';
    this.bindEvent();
  },
  bindEvent: function () {
    // this.play(); //测试使用
    var self = this;
    var playBtnS = document.querySelectorAll('.button');
    // 开始游戏按钮绑定
    playBtnS.forEach(function (item) {
      item.onclick = function () {
        self.play();
      };
    })
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */
  setStatus: function (status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function () {
    this.setStatus('playing');
    createEnemies()
    animate();
    console.log(plane)
  },
  success: function () {
    this.setStatus('success')
  },
  allSuccess: function () {
    this.setStatus('all-success')
  },
  failed: function () {
    this.setStatus('failed')
    var score = document.querySelector('.score');
    score.innerHTML = scoreNum;
  },
  // stop: function(){
  //   this.setStatus('stop')
  // }
};


// 初始化
GAME.init();