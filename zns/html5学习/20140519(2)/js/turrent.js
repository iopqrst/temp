function Turrent(scene) {

    Sprite.call(this, _g_res['bottom']);

    this.zindex = _g_zindex.turret;

    //炮台下的金币值
    this.aScore = [];
    for (var i = 0; i < 6; i++) {
        this.aScore[i] = new Sprite(_g_res['score']);
        this.aScore[i].left = 48 + 23 * i;
        this.aScore[i].top = 586;

        this.aScore[i].zindex = _g_zindex.number;
        scene.add(this.aScore[i]);
    }

    this.setScore(1000);
}

Turrent.prototype = new Sprite();
Turrent.prototype.constructor = Turrent;

Turrent.prototype.setScore = function (score) {
    this.score = score;

    var str = '' + score;
    while (str.length < 6) {
        str = '0' + str;
    }

    for (var i = 0; i < str.length; i++) {
        var n = parseInt(str.charAt(i));

        //console.info(i + '------------', (9 - n) * this.aScore[i].data.h);

        this.aScore[i].data.y = (9 - n) * this.aScore[i].data.h;
    }
}

Turrent.prototype.getScore = function () {
    return this.score;
}