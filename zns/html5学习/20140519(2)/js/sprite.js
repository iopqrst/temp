var id = 1;
/*
data->img,x,y,w,h
*/
function Sprite(data) {
    if (!data) return;

    this.setData(data);
    //this.data = data;

    //物体属性
    this.width = data.w;
    this.height = data.h;

    //基本属性
    //物体的中心
    this.top = 0;
    this.left = 0;

    this.rotate = 0; //物体旋转角度
    this.scaleX = 1; //物体缩放比例:X
    this.scaleY = 1; //物体缩放比例:Y


    this.currentFrame = 0; //当前帧数

    this.totalFrame = 0; //图片帧数
    this.maxFrame = 0; // 最大帧数

    this.speed = 0; //对象运动速度
    this.moveRotate = 0; //运动时转向角度 （垂直Y轴的角度为0度，所以在计算的时候都加上90度，为的就是把原来-90转为0，把0转为90...）


    this.zindex = 0; //越大，越高

    this.id = id++;

    this.target = null; //{x: 12, y: 33} 金币回收后的坐标
}

Sprite.prototype.draw = function (cxt) {
    var d = this.data;
    cxt.save();
    cxt.translate(this.left, this.top);
    cxt.rotate(d2a(this.rotate));
    cxt.scale(this.scaleX, this.scaleY);

    //使图片以中心点位置开始画
    cxt.drawImage(d.img,
        d.x, d.y, d.w, d.h, -d.w / 2, -d.h / 2, d.w, d.h);

    cxt.restore();
}

/**
 * 每个被添加到场景中的元素都会调用nextFrame,但是是否执行要看maxFrame totalFrame 和speed 是否被赋值了
 */
Sprite.prototype.nextFrame = function () {

    if (this.maxFrame && this.totalFrame) {

        this.currentFrame++;

        var cur = Math.floor(this.currentFrame / this.totalFrame);
        this.data.y = (cur % this.maxFrame) * this.data.h;

        //当一轮动画执行完成以后执行，完成的回调函数（如果存在完成的回调函数）
        //console.info(this.currentFrame, (this.maxFrame * this.totalFrame));
        if (this.currentFrame % (this.maxFrame * this.totalFrame) == 0) {
            // console.info('-------here------------');
            this.onanimateend && this.onanimateend();
        }

    }

    // 金币运动
    if (this.target) {
        var speedX = (this.target.x - this.left) / 30;
        var speedY = (this.target.y - this.top) / 30;

        speedX = speedX > 0 ? Math.ceil(speedX) : Math.floor(speedX);

        speedY = speedY > 0 ? Math.ceil(speedY) : Math.floor(speedY);

        this.left += speedX;
        this.top += speedY;

        if (Math.abs(this.left - this.target.x) < 1 && Math.abs(this.top - this.target.y) < 1) {

            this.onmoveend && this.onmoveend();

        }
    }

    if (this.speed) {

        var speedX = Math.sin(d2a(this.moveRotate)) * this.speed;
        var speedY = Math.cos(d2a(this.moveRotate)) * this.speed;

        this.left += speedX;
        this.top -= speedY; //因为炮弹是向上走的，所以为-

        //console.info(this.left, this.top);
    }
}

//按照方形监测
//别忘了坐标是按照中心点来的，所以left top 其实
// 是元素的中心点
Sprite.prototype.pointInRect = function (x, y) {
    var l = this.left - this.width / 2;
    var t = this.top - this.height / 2;
    var r = this.left + this.width / 2;
    var b = this.top + this.height;

    if (l < x && x <= r && 　t <= y && y <= b) {
        return true;
    } else {
        return false;
    }
}

// 方法存在一些错误，当浏览器窗口不是最大化时点击按钮没有反应
Sprite.prototype.pointInCircle = function (x, y) {
    var cx = this.left;
    var cy = this.top;
    //选取宽高中较大的一边作为圆的直径（自己画个图就明白了)
    var r = Math.max(this.width, this.height) / 2;

    var a = x - cx;
    var b = y - cy;

    var c = Math.sqrt(a * a + b * b);

    if (c <= r) {
        return true;
    } else {
        return false;
    }
}

/**
 * 碰撞检测
 * 两个圆的碰撞
 */
Sprite.prototype.collTestCC = function (sprite) {
    var a = this.left - sprite.left;
    var b = this.top - sprite.top;

    var c = Math.sqrt(a * a + b * b);

    var r1 = Math.max(this.width, this.height) / 2;
    var r2 = Math.max(sprite.width, sprite.height) / 2;

    // 把元素当成圆形本身存在一定的误差，比如一个长方形的元素
    // 乘以某个系数为的是能减少一些误差
    r1 *= 0.8;
    r2 *= 0.8;

    if (r1 + r2 >= c) {
        console.info('碰上了 ..... ');
        return true;
    } else {
        return false;
    }

}

Sprite.prototype.setData = function (data) {

    this.data = {};

    for (var i in data) {
        this.data[i] = data[i];
    }

    //物体的属性
    this.width = data.w;
    this.height = data.h;
}