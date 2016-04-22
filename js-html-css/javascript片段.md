```javascript

// 从ua号中获取浏览器版本
if(/MSIE ([^;]+)/.test(ua)) {
	version = RegExp["$1"];
}

// 其他浏览呢？

```

```js

/**
 * 根据样式名称（单个）获取元素
 * @param {Object} obj 在那个元素下查找 document/[元素对象]
 * @param {Object} cls 样式名称
 */
function getClassEles(obj, cls) {
	if (obj.getElementsByClassName) {
		return obj.getElementsByClassName(cls);
	} else {
		var tags = obj.getElementsByTagName('*');
		var aTargetEles = [];

		var oReg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].className.match(oReg)) {
				aTargetEles.push(tags[i]);
			}
		}
		return aTargetEles;
	}
}

function hasClass(ele, cls) {
	return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
	if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	ele.className = ele.className.replace(reg, ' ');
}

```



```js

var d = document, w = window;

/**
 * Get element by id
 */	
function get(element){
	if (typeof element == "string")
		element = d.getElementById(element);
	return element;
}

/**
 * Attaches event to a dom element
 */
function addEvent(el, type, fn){
	if (w.addEventListener){
		el.addEventListener(type, fn, false);
	} else if (w.attachEvent){
		var f = function(){
		  fn.call(el, w.event);
		};			
		el.attachEvent('on' + type, f)
	}
}

/**
 * Creates and returns element from html chunk
 */
var toElement = function(){
	var div = d.createElement('div');
	return function(html){
		div.innerHTML = html;
		var el = div.childNodes[0];
		div.removeChild(el);
		return el;
	}
}();


```