/**
 * 总共有两种金币 1、2
 */
function Coin(type) {
    this.type = type;

    Sprite.call(this, _g_res['coin' + type]);

    this.totalFrame = 6;
    this.maxFrame = 10;

    this.zindex = _g_zindex.coin;

    this.target = {
        x: 103,
        y: 570
    };
}

Coin.prototype = new Sprite();
Coin.prototype.constructor = Coin;