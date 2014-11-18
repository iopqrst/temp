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
    this.ev_list = []; //场景中所有的事件

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
        //console.info('scene --- ', _this.width, _this.height);
    }, FPS);

    function _addEv(canvasEvName, evName) {

        oC[canvasEvName] = function (ev) {

            //  此处如果不加上滚动条的高度或者宽度，当页面出现滚动条时，时间触发不了，原因
            // 区域与当前点击的区域不同
            var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            var iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft; //滚动条宽度
            //document.body.scrollXXX --> chrome获取方式

            var x = (ev.clientX + iScrollLeft) - oC.offsetLeft;
            var y = (ev.clientY + iScrollTop) - oC.offsetTop;

            var myEv = {
                x: x,
                y: y
            };

            for (var i = 0; i < _this.ev_list.length; i++) {

                var a = _this.ev_list[i];

                if (a.ev != evName) continue;

                if (a.obj) {
                    switch (a.type) {
                    case 'rect':
                        if (a.obj.pointInRect(x, y)) {
                            a.fn(myEv);

                            if (a.stop) {
                                return;
                            }
                        }
                        break;
                    case 'circle':
                        if (a.obj.pointInCircle(x, y)) {
                            a.fn(myEv);
                            if (a.stop) {
                                return;
                            }
                        }
                        break;
                    }
                } else {
                    a.fn(myEv);
                    if (a.stop) {
                        return;
                    }
                }

            }

        }
    }

    _addEv('onmousedown', 'down');
    _addEv('onmouseup', 'up');
    _addEv('onclick', 'click');
    _addEv('onmousemove', 'move');
}

Scene.prototype.add = function (obj) {
    this.eles.push(obj);
}

Scene.prototype.remove = function (obj) {
    this.eles.remove(obj);
}

/*
 * ev 事件名-> 'down'/up'
 * type 检测方式 -> 'rect' /circle
 */
Scene.prototype.addEvent = function (obj, options) {
    //ev , type , fn

    options = options || {};
    options.type = options.type || 'rect';
    options.stop = options.stop || false;

    this.ev_list.push({
        obj: obj,
        ev: options.ev,
        fn: options.fn,
        type: options.type,
        stop: options.stop

    })
}