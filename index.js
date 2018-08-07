function game() {
    this.body = document.querySelector(".body");//界面
    this.btn = document.querySelector(".btn");//发射按钮
    this.ScoreBox = document.querySelector(".Score");
    this.Score = 0;
    this.life = 3;
    this.Bullets = [];//子弹
    this.BulletsBottom =7;
    this.gargets = [];//下落点；
    this.gargetsTop = 1;
    this.gargetTime = 3000;//创建下落点间隔时间
    this.gargetMoveTime = 25;//下落速度
    this.Over1 = 300;
    this.clickFlag = null;//点击事件
    this.btnstate = false;//点击事件
    this.point = 300;
    this.closeTime1 = null;
    this.closeTime2 = null;
    this.closeTime3 = null;
}

Object.assign(game.prototype, {
    /**初始化**/
    init: function () {
        var _this = this;
        _this.btn.onclick = function () {
            _this.doOnClick(function (id) {
                _this.newBullet(id)
            });
        };
        /**
         * 初始化数据
         * **/
        this.Score = 0;
        this.life = 3;
        this.ScoreBox.innerHTML = this.Score;
        this.Bullets = [];
        this.gargets = [];
        this.closeTime1 = null;
        this.closeTime2 = null;
        this.closeTime3 = null;
        /**开始游戏**/
        _this.move();
        _this.garget();
        _this.gargetMove();
    },
    /**创建子弹**/
    newBullet: function (id) {
        var span = document.createElement("span");
        id === 1 ? span.className = "bull" : span.className = "red";
        span.style.bottom = "100px";
        this.Bullets.push(span);
        this.body.appendChild(span);
    },
    /**创建下落物品**/
    newgarget: function () {
        var span = document.createElement("span");
        if (Math.floor(Math.random() * 3) <= 0) {
            span.className = "target2";
        } else {
            span.className = "target";
        }
        span.style.top = "1px";
        this.gargets.push(span);
        this.body.appendChild(span);
    },
    /**点击事件 单击&双击**/
    doOnClick: function (cb) {
        let _this = this;
        if (this.clickFlag) {//取消上次延时未执行的方法
            this.clickFlag = clearTimeout(this.clickFlag);
            this.btnstate = true;
        }
        this.clickFlag = setTimeout(function () {
            cb && cb(1);
            _this.clickFlag = null;
            _this.btnstate = false;
        }, 300);//延时300毫秒执行
        if (this.btnstate) {//取消上次延时未执行的方法
            this.clickFlag = clearTimeout(this.clickFlag);
            cb && cb(2);
            this.btnstate = false;
        }
    },
    /**子弹向上移动**/
    move: function () {
        var _this = this;
        this.closeTime1 = setInterval(function () {
            if (_this.Bullets.length > 0) {
                for (var i = 0, idx = _this.Bullets.length; i < idx; i++) {
                    if(_this.Bullets[i]){
                        var enemySpeed = parseInt(_this.Bullets[i].style.bottom);
                        enemySpeed += _this.BulletsBottom;
                        _this.Bullets[i].style.bottom = enemySpeed + "px";
                        if (Number(_this.Bullets[i].style.bottom.substring(0, 3)) > 530) {
                            _this.body.removeChild(_this.Bullets[i]);
                            _this.Bullets.splice(i, 1);
                        }
                    }
                    for (var k = 0, ind = _this.gargets.length; k < ind; k++) {
                        if (_this.hitTestObject(_this.Bullets[i], _this.gargets[k])) {
                            _this.Over(_this.Bullets[i], _this.gargets[k]);
                            _this.body.removeChild(_this.Bullets[i]);
                            _this.Bullets.splice(i, 1);
                            _this.body.removeChild(_this.gargets[k]);
                            _this.gargets.splice(k, 1);
                        }
                    }
                }
            }
        }, 25)
    },
    /**生成降落点**/
    garget: function () {
        var _this = this;
        this.closeTime2 = setInterval(function () {
            _this.newgarget()
        }, this.gargetTime)
    },
    /**降落点移动**/
    gargetMove: function () {
        var _this = this;
        this.closeTime3 = setInterval(function () {
            if (_this.gargets.length > 0) {
                for (var i = 0, idx = _this.gargets.length; i < idx; i++) {
                    if (parseInt(_this.gargets[i].style.top) > _this.Over1) {
                        _this.body.removeChild(_this.gargets[i]);
                        _this.gargets.splice(i, 1);
                        _this.reduce();
                        return;
                    }
                    var enemySpeed = parseInt(_this.gargets[i].style.top);
                    enemySpeed += _this.gargetsTop;
                    _this.gargets[i].style.top = enemySpeed + "px";
                }
            }
        }, this.gargetMoveTime)
    },
    /**碰撞检测**/
    hitTestObject: function (item, hitObj) {
        if (item == null || hitObj == null) {
            return false;
        }
        /*检测碰撞元素上下左右的位置*/
        var itemTop = item.offsetTop,
            itemFoot = item.offsetTop + item.offsetHeight,
            itemLeft = item.offsetLeft,
            itemRight = item.offsetLeft + item.offsetWidth;
        /*被碰撞元素的上下左右的位置*/
        var hitTop = hitObj.offsetTop,
            hitFoot = hitObj.offsetTop + hitObj.offsetHeight,
            hitLeft = hitObj.offsetLeft,
            hitRight = hitObj.offsetLeft + hitObj.offsetWidth;
        if (itemFoot > hitTop && itemRight > hitLeft && itemTop < hitFoot && itemLeft < hitRight) {
            return true;
        }
    },
    /**碰撞后执行动画**/
    Over: function (a, b) {
        var _this = this;
        var x = a.offsetLeft;
        var y = a.offsetTop;
        var div = document.createElement("div"),
            html = "<span class=\"over1\"></span>";
        div.className = "over";
        div.innerHTML = html;
        _this.body.appendChild(div);
        div.style.top = y - 25 + "px";
        div.style.left = x - 25 + "px";
        setTimeout(function () {
            _this.body.removeChild(div)
        }, 1600);
        if (a.className === "bull" && b.className === "target") {
            _this.Score += 10;
            _this.ScoreBox.innerHTML = _this.Score;
            return;
        }
        if (a.className === "red" && b.className === "target2") {
            _this.Score += 10;
            _this.ScoreBox.innerHTML = _this.Score;
            return;
        }
        if (a.className === "bull" && b.className !== "target" || a.className === "red" && a.className !== "target2") {
            _this.Score -= 10;
            _this.ScoreBox.innerHTML = _this.Score;
        }
    },
    /**生命消减**/.0
    reduce: function () {
        this.life--;
        if (this.life <= 0) {
            this.END()
        }
    },
    /**游戏结束**/
    END: function () {
        clearInterval(this.closeTime1);
        clearInterval(this.closeTime2);
        clearInterval(this.closeTime3);
        this.Bullets = [];
        this.gargets = [];
        var node = document.querySelectorAll(".bull,.red,.target,.target2");
        for(var i =0,idx=node.length;i<idx;i++){
            this.body.removeChild(node[i])
        }
            node =null;
        this.btn.onclick=null;
        alert("游戏结束")
    },
});

var a = new game();
a.init();