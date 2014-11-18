var FPS = 1000 / 60;

var _g_res = {};
var _g_zindex = {
    bg: 0,
    fish: 100,
    turret: 200,
    bullet: 300,
    cannon: 500
};

function loadRes(arr, fnEnd) {

    var imgs = {}; //存放所有已经加载的图片信息，另外判断如果某张图片已经加载过则不再加载

    var loadSucCount = 0; //加载成功图片数量
    var imgsTotal = 0; //图片总数
    var loadResCount = 0; //已经加载的资源数量

    for (var i = 0; i < arr.length; i++) {

        ajax(arr[i], function (data) {
            loadResCount++;

            var json = JSON.parse(data);

            for (var item in json) {
                var src = json[item].src;

                if (!imgs[src]) {

                    imgs[src] = new Image();
                    imgsTotal++;

                    imgs[src].onload = function () {
                        loadSucCount++;
                        //如果图片总数和图片已经完成的总数相等，另外加载资源的总数和传入资源总数相等，则说明所有资源已经加载完成
                        if (imgsTotal == loadSucCount && loadResCount == arr.length) {
                            fnEnd && fnEnd();
                        }
                    };

                    imgs[src].src = src;
                }

                _g_res[item] = {
                    img: imgs[src],
                    x: json[item].x,
                    y: json[item].y,
                    w: json[item].w,
                    h: json[item].h
                };
            }

        }, function () {
            alert('fail');
        })

    }
}

/**
 * 随机产生n到m的随机数
 */
function rnd(n, m) {
    return Math.round(Math.random() * (m - n) + n);
}

/**
 * 弧度转角度
 */
function a2d(n) {
    return n * 180 / Math.PI;
}

/**
 * 角度转弧度
 */
function d2a(n) {
    return n * Math.PI / 180;
}

/**
 * 根据坐标获取计算与X轴的角度
 *
 * 没有搞懂~~~~~~
 */
function getAng(obj1, obj2) {
    var a = 90 - a2d(Math.atan2(obj2.y - obj1.y, obj1.x - obj2.x))
    return a;
}

/**
 * 删除数组中的元素，（下面的写法为以后js提供remove做兼容）
 */
Array.prototype.remove = Array.prototype.remove || function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (obj == this[obj]) {
            this.splice(i, 1);
            i--;
        }
    }
}