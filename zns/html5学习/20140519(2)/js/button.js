function Button(dataNormal, dataDown, scene) {
    var _this = this;

    Sprite.call(this, dataNormal);

    scene.addEvent(this, {
        ev: 'down',
        fn: function () {
            _this.data = dataDown;
        },
        stop: true
    });

    scene.addEvent(this, {
        ev: 'up',
        fn: function () {
            _this.data = dataNormal;
        },
        stop: true
    });

    scene.addEvent(this, {
        ev: 'click',
        fn: function () {
            _this.onclick && _this.onclick();
        },
        stop: true
    });

    this.zindex = _g_zindex.button;
}

Button.prototype = new Sprite();
Button.prototype.constructor = Button;