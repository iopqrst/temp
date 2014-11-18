var id = 1;

function Sprite(data) {
    if (!data) return;

    this.data = data;

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

    if (this.speed) {

        var speedX = Math.sin(d2a(this.moveRotate)) * this.speed;
        var speedY = Math.cos(d2a(this.moveRotate)) * this.speed;

        this.left += speedX;
        this.top -= speedY; //因为炮弹是向上走的，所以为-

        //console.info(this.left, this.top);
    }
}