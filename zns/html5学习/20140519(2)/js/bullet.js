/**
 * 子弹
 */

function Bullet(type) {
    this.type = type;

    Sprite.call(this, _g_res['bullet' + this.type]);

    this.speed = 5;
    this.zindex = _g_zindex.bullet;

    this.attack = type * 10;
}

Bullet.prototype = new Sprite();
Bullet.prototype.constructor = Bullet;