function Turrent() {

    Sprite.call(this, _g_res['bottom']);

    this.zindex = _g_zindex.turret;
}

Turrent.prototype = new Sprite();
Turrent.prototype.constructor = Turrent;