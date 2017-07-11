## ES6 的 Promise 


> 参考文章：
>  
> + [ES6的Promise对象](http://www.cnblogs.com/tugenhua0707/p/4771528.html)


### 什么是Promise？

Promise 对象可以理解为一次执行的异步操作，使用Promise对象之后可以使用一种链式调用的方式来组织代码； 让代码更加直观。

### why Promise

避免嵌套，简化代码逻辑

栗子：Ajax请求A后得到结果 Aresult ， 将结果 Aresult 传递给另外一个Ajax 请求 B 。


````js

$.ajax({
	url : 'A',
    dataType : 'json',
	success : function(data) {
		
		var aresult = data.result；

		$.ajax({
			url : 'B',
			data : { 'id' : aresult },
		    dataType : 'json',
			success : function(data) {
				// 继续嵌套...
			}
		})
	}
})

````

## 缺点

1. 多层嵌套，代码不直观
2. 逻辑混乱

### 浏览器支持情况 

IE <= 11 不支持， Edge 支持
Firefox >= 31 支持
chrome >= 31 支持
safari > 7 支持
ios safari > 7.1 
Android Browser >= 4.4.4
Chrome for Android >= 42


### 创建Promise对象

````javascript

var promise = new Promise(function(resolve, reject){
	// 异步处理

	// 成功调用 resolve 往下传递参数， 且只接受一个参数

	// 失败调用 reject 往下传递参数， 且只接受一个参数
});
````

通过`new`生成的promise对象为了设置其值在resolve（成功）/reject(失败）时调用的回调函数，可以使用promise.then() 实例方法。

#### `promise.then(onFulfilled, onRejected); 

resolve（成功）是嗲用onFullfilled方法， reject(失败）时调用 onReject 方法

Promise.then 成功和失败是都可以使用，如果出现怡成的情况下可以采用 promise.then(undefined, onRejected) 这种方式，只指定onRejected 回调函数即可，不过针对珍重情况我们有更好的选择使用 `catch` , ex 

`promise.catch(onRejected)` 

### 理解Promise.resolve

一般情况下我们都会使用new Promise()来创建promise对象，但是我们也可以使用promise.resolve 和 promise.reject这两个方法；

Promise.resolve(value)的返回值也是一个promise对象，我们可以对返回值进行.then调用；如下代码：

```
Promise.resolve(11).then(function(value){
    console.log(value); // 打印出11
});
```

resolve(11)代码中，会让promise对象进入确定(resolve状态)，并将参数11传递给后面的then所指定的onFulfilled 函数；

我们上面说过创建promise对象，可以使用new Promise的形式创建对象，但是我们这边也可以使用Promise.resolve(value)的形式创建promise对象；

理解Promise.reject

Promise.reject 也是new Promise的快捷形式，也创建一个promise对象，比如如下代码：

Promise.reject(new Error("我错了，请原谅俺！！"));

就是下面的代码new Promise的简单形式：

````
new Promise(function(resolve,reject){
     reject(new Error("我错了，请原谅俺！！"));
});

````

````
function testPromise(ready) {
    return new Promise(function(resolve,reject){
        if(ready) {
            resolve("hello world");
        }else {
            reject("No thanks");
        }
    });
};
// 方法调用
testPromise(true).then(function(msg){
    console.log(msg);
},function(error){
    console.log(error);
});
````
上面的代码的含义是给testPromise方法传递一个参数，返回一个promise对象，如果为true的话，那么调用promise对象中的resolve()方法，并且把其中的参数传递给后面的then第一个函数内，因此打印出 “hello world”, 如果为false的话，会调用promise对象中的reject()方法，则会进入then的第二个函数内，会打印No thanks；


### 理解Promise异步调用的操作

```
var promise = new Promise(function(resolve){
    console.log(1);
    resolve(3);
});
promise.then(function(value){
    console.log(value);
});
console.log(2);

```
上面的代码输出我们可以看到，分别为 1,2,3； 首先代码从上往下执行，首先输出1，然后调用resolve(3)这个方法，这时候promise对象变为确定状态，即调用onFulFilled这个方法，从上面了解到，resolve(成功) 时 调用onFulfilled 方法，Promise.then 成功和失败时都可以使用，因此第一个函数是成功调用的，但是Promise对象是以异步方式调用的，所以先执行console.log(2)，输出的是2，然后输出的是3；

### 理解

```
function ready(fn){
    var readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
        fn();
    } else {
        window.addEventListener('DOMContentLoaded', fn);
    }
}
ready(function(){
    console.log("DOM Load Success");
});
console.log("我是同步输出的");

```

如上代码；如果在调用ready()方法之前DOM已经载入完成的话，就会对回调函数进行同步调用，先输出DOM Load Success 后输出 我是同步输出的 文案；如果在调用ready()方法之前DOM为未载入完成的话，那么代码先会执行 window.addEventListener('DOMContentLoaded', fn);

就会异步调用该函数，那么就会先输出 “我是同步输出的”，后输出”DOM Load Success”;

为了解决上面的同步或者异步混乱的问题，我们现在可以使用promise对象使用异步的方式来解决；如下代码

``` 
function readyPromise(){
    return new Promise(function(resolve,reject){
        var readyState = document.readyState;
        if (readyState === 'interactive' || readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('DOMContentLoaded', resolve);
        }
    });
}
readyPromise().then(function(){
    console.log("DOM Load Success");
});
console.log("我是同步加载的，先执行我");
```

输出如下：先输出"我是同步加载的，先执行我" 后输出 "DOM Load Success"。因为promise对象是异步加载的。

### 理解promise的三种状态

Promise 对象有三种状态：

  Resolve 可以理解为成功的状态；

  Rejected 可以理解为失败的状态；

  Pending既不是Resolve也不是Rejected状态；可以理解为Promise对象实例创建时候的初始状态；

比如Promise对象中的resolve方法就是调用then对象的第一个函数，也就是成功的状态；而reject方法就是调用then对象的第二个函数，也就是失败的状态；

理解then()

上面的代码，比如如下这样的代码就是then的列子；代码如下：

```
function testPromise(ready) {
    return new Promise(function(resolve,reject){
        if(ready) {
            resolve("hello world");
        }else {
            reject("No thanks");
        }
    });
};
// 方法调用
testPromise(true).then(function(msg){
    console.log(msg);
},function(error){
    console.log(error);
});
```

上面的代码就是利用了 then(onFulfilled，onRejected)方法来执行的，第一个方法就是成功状态的标志，第二个方法是失败的状态标志；

当然在多个任务的情况下then方法同样可以使用；比如上面的代码改成如下：

```
function testPromise(ready) {
    return new Promise(function(resolve,reject){
        if(ready) {
            resolve("hello world");
        }else {
            reject("No thanks");
        }
    });
};
// 方法调用
testPromise(true).then(function(msg){
    console.log(msg);
}).then(testPromise2)
  .then(testPromise3);
function testPromise2(){
    console.log(2);
}
function testPromise3(){
    console.log(3);
}

```
输出如下：hello world ，2,3

上面的代码是then的链式调用方式，输出是按顺序输出的 分别为 hello world , 2,3; 使用链式调用的原因是 每次调用后都会返回promise对象；

#### 理解Promise.catch()方法

Promise.catch()方法是promise.then(undefined,onRejected)方法的一个别名，该方法用来注册当promise对象状态变为Rejected的回调函数。

如下代码：
```
var promise = Promise.reject(new Error("message"));
promise.catch(function(error){
    console.log(error);
});
```

打印如下所示：

Error: message{ stack:(...), message:"message }
	message : "message"
	stack : (...)
	get stack : function() {[]}
	set stack : function() {[]}
__proto__ : d
	......

理解每次调用then都会返回一个新创建的promise对象

不管是then还是catch方法调用，都返回一个新的promise对象；

下面我们来看看代码如下：

```
var promise1 = new Promise(function(resolve){
    resolve(1);
});
var thenPromise = promise1.then(function(value){
    console.log(value);
});
var catchPromise = thenPromise.catch(function(error){
    console.log(error);
});
console.log(promise1 !== thenPromise); // true
console.log(thenPromise !== catchPromise); //true

```

如上代码，打印的都是true，这说明不管是then还是catch都返回了和新创建的promise是不同的对象；

如果我们知道了then方法每次都会创建返回一个新的promise对象的话，那么久不难理解下面的代码了；如下：

```
var promise1 = new Promise(function(resolve){
    resolve(1);
});
promise1.then(function(value){
    return value * 2;
});
promise1.then(function(value){
    return value * 2;
});
promise1.then(function(value){
    console.log("1"+value);
});

```

如上的代码；打印出11；因为他们每次调用then方法时，是使用的不同的promise对象；因此最后打印的value还是1；但是如果我们then方法是连续调用的话，那情况就不一样了，比如如下代码：

```
var promise1 = new Promise(function(resolve){
    resolve(2);
});
promise1.then(function(value){
    return value * 2;
}).then(function(value){
    return value * 2;
}).then(function(value){
    console.log("1"+value);
});

```
打印出18，即 "1" + 2*2*2 = 18;

上面第一种方法没有使用方法链的调用，上面第一种那种写法then 调用几乎是同时开始进行的，且传给每个then的value都是1；

第二种方式是使用方法链的then，使多个then方法连接在一起了，因此函数会严格执行 resolve -- then --- then -- then的顺序执行，并且传递每个then方法的value的值都是前一个promise对象中return的值；因此最后的结果就是18了；

现在我们再回过头一刚开始我们讨论的为什么要使用promise的原因的问题了，比如2个ajax请求，后一个ajax请求需要获取到前一个ajax请求的数据，我们之前在使用jquery写代码是如下的：

```
$.ajax({
   url: '',
   dataType:'json',
   success: function(data) {
    // 获取data数据 传给下一个请求
    var id = data.id;
    $.ajax({
        url:'',
        data:{"id":id},
        success:function(){
            // .....
        }
    });
  }
});

```
现在我们学习了then方法后，我们可以重新编写上面的代码变成如下：

```
var ajaxPromise = new Promise(function(resolve){
    resolve();
});
ajaxPromise.then(function(){
    $.ajax({
        url:'',
        dataType:'json',
        success: function(data) {
            var id = data.id;
            return id;
        }
    })
}).then(function(id){
    $.ajax({
        url:'',
        dataType:'json',
        data:{"id":id},
        success: function(data){
            console.log(data);
        }
    })
});

```
### 理解Promise.all

Promise.all可以接受一个元素为Promise对象的数组作为参数，当这个数组里面所有的promise对象都变为resolve时，该方法才会返回。

如下代码：

```
var promise1 = new Promise(function(resolve){
    setTimeout(function(){
        resolve(1);
    },3000);
});
var promise2 = new Promise(function(resolve){
    setTimeout(function(){
        resolve(2);
    },1000);
});
Promise.all([promise1,promise2]).then(function(value){
    console.log(value); // 打印[1,2]
});
```

如上代码 打印的是[1,2]; 如上我们看到promise1对象中的setTimeout是3秒的时间，而promise2对象中的setTimeout是1秒的时间，但是在Promise.all方法中会按照数组的原先顺序将结果返回；

在我们平时的需求中，或许有这种情况的需求，比如我们需要发2个ajax请求时，不管他们的先后顺序，当这2个ajax请求都同时成功后，我们需要执行某些操作的情况下，这种情况非常适合； 

### 理解Promise.race

如上可知：Promise.all 在接收到的所有对象promise都变为FulFilled或者 Rejected状态之后才会继续后面的处理，但是Promise.race的含义是只要有一个promise对象进入FulFilled或者Rejected状态的话，程序就会停止，且会继续后面的处理逻辑；

如下代码：

```
// `delay`毫秒后执行resolve
function timerPromise(delay){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(delay);
        },delay);
    });
}

// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
    timerPromise(1),
    timerPromise(32),
    timerPromise(64),
    timerPromise(128)
]).then(function (value) {
    console.log(value);    // => 1
});

```
如上代码创建了4个promise对象，这些promise对象分别在1ms,32ms,64ms,128ms后变为确定状态，并且在第一个变为确定状态后1ms后，then函数就会被调用，这时候resolve()方法给传递的值为1，因此执行then的回调函数后，值变为1；

我们再来看看当一个promise对象变为确定状态(FulFiled)的时候，他们后面的promise对象是否还在运行呢？我们继续看如下代码运行：

```
var runPromise = new Promise(function(resolve){
    setTimeout(function(){
        console.log(1);
        resolve(2);
    },500);
});
var runPromise2 = new Promise(function(resolve){
    setTimeout(function(){
        console.log(3);
        resolve(4);
    },1000);
});
// 第一个promise变为resolve后程序停止
Promise.race([runPromise,runPromise2]).then(function(value){
    console.log(value);
});
```
   如上代码是使用定时器调用的，上面是2个promise对象，我们看到第一个promise对象过500毫秒后加入到执行队列里面去，如果执行队列没有其他线程在运行的时候，就执行该定时器，所以第一次打印1，然后调用resolve(2); 接着调用promise.race方法，该方法只要有一个变为成功状态(FulFiled)的时候，程序就会停止，因此打印出2，同时后面的promise对象接着执行，因此打印出3，但是由于promise.race()该方法已经停止调用了，所以resolve(4)不会有任何输出；因此最后输出的是1,2,3；

由此我们得出结论，当一个promise对象变为(FulFilled)成功状态的时候，后面的promise对象并没有停止运行。

### Deferred和Promise的关系

Deferred 包含 Promise；

Deferred具备Promise的状态进行操作的特权方法；

下面我们来看看使用promise来实现deferred;如下代码：

```
function Deferred(){
    this.promise = new Promise(function(resolve,reject){
        this._resolve = resolve;
        this._reject = reject;
    }.bind(this));
}
Deferred.prototype.resolve = function(value) {
    this._resolve.call(this.promise,value);
};
Deferred.prototype.reject = function(reason) {
    this._reject.call(this.promise,reason);
};
function getURL(URL){
    var deferred = new Deferred();
    var req = new XMLHttpRequest();
    req.open('GET',URL,true);
    req.onload = function(){
        if(req.status === 200) {
            deferred.resolve(req.responseText);
        }else {
            deferred.reject(new Error(req.statusText));
        }
    };
    req.onerror = function(){
        deferred.reject(new Error(req.statusText));
    };
    req.send();
    return deferred.promise;
}
var URL = 'http://127.0.0.1/promise/promise.php';
getURL(URL).then(function onFulfilled(value){
    console.log(value);
});
```
其中promise.php代码输出的是一个json的数据，代码如下：

```
<?php 
    $data = json_decode(file_get_contents("php://input"));
    header("Content-Type: application/json; charset=utf-8");
    echo ('{"id" : ' . $data->id . ', "age" : 24, "sex" : "boy", "name" : "huangxueming"}');
?>
```

最后执行打印console的出来是：

{"id" : , "age" : 24, "sex" : "boy", "name" : "huangxueming"}

使用promise封装deferred的方法，无非就是使用promise对象中的resolve和Reject等调用方法，下面我们再来看看使用promise对象对ajax请求的封装如下：

```
function getURL(URL){
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var URL = 'http://127.0.0.1/promise/promise.php';
getURL(URL).then(function onFulfilled(value){
    console.log(value);
});
```

上面分别两种方式使用promise对象实现ajax请求的封装对比如下：

 Deferred那种方式不需要将promise代码括起来。

Promise代表了一个对象，这个对象的状态现在还不确定，但是未来一个时间点它的状态要么变为正常值（FulFilled），要么变为异常值（Rejected）；而Deferred对象表示了一个处理还没有结束的这种事实，在它的处理结束的时候，可以通过Promise来取得处理结果。