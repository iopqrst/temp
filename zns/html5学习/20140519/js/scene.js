/**
 * 场景（所有的元素都在一个场景内，场景内的元素可以添加或者删除）
 */
function Scene(id) {

    var _this = this;

    var oC = document.getElementById(id);
    var cxt = oC.getContext('2d');

    this.width = oC.width;
    this.height = oC.height;
    this.eles = []; // 场景中的元素

    setInterval(function () {

        _this.onenterframe && _this.onenterframe();

        //排序(因为后画的图像会覆盖之前的图像，为保证场景显示合理，需要给各个元素指定相应的层级，此处对层级进行排序，层级高的排后显示

        cxt.clearRect(0, 0, _this.width, _this.height);

        _this.eles.sort(function (sprite1, sprite2) {

            if (sprite1.zindex - sprite2.zindex == 0) {
                return sprite1.id - sprite2.id;
            } else {
                return sprite1.zindex - sprite2.zindex;
            }

        });

        for (var i = 0; i < _this.eles.length; i++) {
            _this.eles[i].draw(cxt);
            _this.eles[i].nextFrame();
        }

    }, FPS);

}

Scene.prototype.add = function (obj) {
    this.eles.push(obj);
}

Scene.prototype.remove = function (obj) {
    this.eles.remove(obj);
}