function Fish(type) {
    this.type = type;

    Sprite.call(this, _g_res['fish' + this.type]);

    this.maxFrame = 4; // 最大帧数
    this.totalFrame = 8; //图片上总帧数
    this.speed = rnd(5, 20) / 10; //随机一个移动速度

    this.zindex = _g_zindex.fish;

    this.hp = Math.pow(2, type - 1) * 10;
}

Fish.prototype = new Sprite();
Fish.prototype.constructor = Fish;