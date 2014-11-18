function Cannon(type) {
    this.type = type;

    Sprite.call(this, _g_res['cannon' + this.type]);

    this.maxFrame = 0;
    this.totalFrame = 0;

    this.zindex = _g_zindex.cannon;

    this.onanimateend = function () {
        this.stopFrame();
    };

    //开炮频率
    this.last_short = 0; //最后一次开炮时间
    this.shortFrequece = 500; //每次开炮间隔时间
}

Cannon.prototype = new Sprite();
Cannon.prototype.constructor = Cannon;

Cannon.prototype.startFrame = function () {
    this.maxFrame = 5;
    this.totalFrame = 5;
}

Cannon.prototype.stopFrame = function () {
    this.maxFrame = 0;
    this.totalFrame = 0;
}

Cannon.prototype.isReady = function () {
    var now = new Date().getTime();
    // 判断一下两次开炮的时间间隔是否大于shortFrequece
    if (now - this.last_short >= this.shortFrequece) {
        this.last_short = now;
        return true;
    } else {
        return false;
    }
}