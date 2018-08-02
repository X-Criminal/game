function game(){
     this.body = document.querySelector(".body");//界面
     this.btn = document.querySelector(".btn");//发射按钮
     this.Bullets=[];//子弹
     this.bulletsPosition=[];//子弹坐标
     this.gargets=[];//下落点；
     this.gargetsPosition=[];//下落点坐标；
     this.gargetTime=3000;//创建下落点间隔时间
     this.gargetMoveTime=25;//下落速度
     this.clickFlag=null;//点击事件
     this.btnstate=false;//点击事件
     this.point=300;
}

Object.assign(game.prototype,{
    init:function( ){
        var _this = this;
        _this.btn.onclick=function(){
            _this.doOnClick(function(id){
                _this.newBullet(id)
            });
        };
        _this.move( );
        _this.garget( );
        _this.gargetMove( );
    },
    /**创建子弹**/
    newBullet:function(id){
        var span = document.createElement("span");
        id===1?span.className="bull":span.className="red";
        this.body.appendChild(span);
        this.Bullets.push(span);
        this.bulletsPosition.push(0);
    },
    /**创建下落物品**/
    newgarget:function(){
      var span=document.createElement("span");
          span.className="target";
        this.body.appendChild(span);
          this.gargets.push(span);
          this.gargetsPosition.push(0);
    },
    /**点击事件 单击&双击**/
    doOnClick: function (cb) {
        let _this = this;
        if (this.clickFlag) {//取消上次延时未执行的方法
            this.clickFlag = clearTimeout(this.clickFlag);
            this.btnstate=true;
        }
        this.clickFlag = setTimeout(function () {
            cb&&cb(1);
            _this.clickFlag=null;
            _this.btnstate=false;
        }, 300);//延时300毫秒执行
        if (this.btnstate) {//取消上次延时未执行的方法
            this.clickFlag = clearTimeout(this.clickFlag);
            cb&&cb(2);
            this.btnstate=false;
        }
    },
    /**子弹向上移动**/
    move:function(){
        var _this = this;
        setInterval(function () {
            if (_this.Bullets.length > 0) {
                for (var i = 0, idx = _this.Bullets.length; i < idx; i++) {
                    _this.bulletsPosition[i] = _this.bulletsPosition[i]+1;
                    _this.Bullets[i].style.transform ="translateY(-"+_this.bulletsPosition[i]+"px)";
                }
            }
        },10)
    },
    /**生成降落点**/
    garget:function(){
        var _this = this;
        setInterval(function(){
            _this.newgarget()
        },this.gargetTime)
    },
    /**降落点移动**/
    gargetMove:function(){
        var _this = this;
        setInterval(function(){
            if(_this.gargets.length>0){
                for(var i =0,idx=_this.gargets.length;i<idx;i++){
                    _this.gargetsPosition[i]=_this.gargetsPosition[i]+1;
                    _this.gargets[i].style.transform="translateY("+_this.gargetsPosition[i]+"px)";
                    if(_this.gargetsPosition[i]>=this.point){

                    }
                }
            }
        },this.gargetMoveTime)
    },
    /**下落物消失位置**/
});

var a = new game( );
a.init( );