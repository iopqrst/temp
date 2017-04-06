// es6中的箭头函数

/*
([param][,param]) => {
	statements
}

param => expression

param 是参数,根据参数个数不同,分为以下情况:

()=> {...}  // 零个参数用()表示
x=> {...} // 一个参数可以省略()；
(x,y)=>{...} // 多个参数不能省略；
*/

// 1.
''
// ES5
var selected = allJobs.filter(function(job) {
	return job.isSelected();
});

// ES6
var selected = allJobs.filter(job => job.isSelected());

// 2.

// ES5
var total = values.reduce(function(a, b) {
	return a + b;
}, 0);

// ES6
var total = values.reduce((a, b) => a + b, 0);

// 当然=>后面也不一定非得接return 之后的语句，看下面：

// 3.

// ES5
$("#confetti-btn").click(function(event) {
	playTrumpet();
	fireConfettiCannon();
});

//ES6
$("#confetti-btn").click(event => {
	playTrumpet();
	fireConfettiCannon();
});

//是需要注意的是，多行语句需要用{}括起来，单行表达式不需要{}，并且会作为函数返回值。

x => {
	return x * x
}; // 函数返回 x * x
x => x * x; // 同上一行
x =>
	return x * x; // SyntaxError 报错，不能省略 {}
x => {
	x * x
}; // 合法，没有定义返回值，返回 undefined

和普通函数一样, 箭头函数也可以使用剩余参数和默认参数

var func1 = (x = 1, y = 2) => x + y;
func1();

和普通函数一样， 箭头函数也可以使用剩余参数和默认参数。

特性

介绍完了箭头表达式的语法和示例， 我们就需要思考一下了。 如果箭头表达式仅仅就是简化了函数的命名， 我们为什么要改变原来的习惯而去使用它呢？ 所以我们需要了解一下箭头函数的特性。

箭头函数内部没有constructor方法， 也没有prototype， 所以不支持new操作。 但是它对this的处理与一般的普通函数不一样。 箭头函数的 this 始终指向函数定义时的 this， 而非执行时。 我们通过一个例子来理解:

	var o = {
		x: 1,
		func: function() {
			console.log(this.x)
		},
		test: function() {
			setTimeout(function() {
				this.func();
			}, 100);
		}
	};

o.test(); // TypeError : this.func is not a function

上面的代码会出现错误， 因为this的指向从o变为了全局（ 函数调用中的this都是指向全局的）。 如果大家对JavaScript中的this不是很熟悉的话， 可以看看我写过的一篇文章， 深入理解javascript之this。 好了， 回归正题， 我们需要修改上面的代码如下：

var o = {
	x: 1,
	func: function() {
		console.log(this.x)
	},
	test: function() {
		var _this = this;
		setTimeout(function() {
			_this.func();
		}, 100);
	}
};

o.test();

通过使用外部事先保存的this就行了。 这里就可以利用到箭头函数了， 我们刚才说过， 箭头函数的 this 始终指向函数定义时的 this， 而非执行时。 所以我们将上面的代码修改如下：

var o = {
	x: 1,
	func: function() {
		console.log(this.x)
	},
	test: function() {
		setTimeout(() => {
			this.func()
		}, 100);
	}
};

o.test();

这回this就指向o了。

我们还需要注意一点的就是这个this是不会改变指向对象的， 我们知道call和apply可以改变this的指向， 但是在箭头函数中是无效的。

var x = 1,
	o = {
		x: 10,
		test: () => this.x
	};

o.test(); // 1
o.test.call(o); // 依然是1