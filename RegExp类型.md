## 正则表达式

1.字面量形式正则

	var expression = / pattern / flags;

- g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
- i：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；   
- m：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

注意：
( [ { \ ^ $ | ) ? * + .]} 这些字符在正则表达式中具有一定意义，使用时需要进行转义。


	// 匹配第一个bat或cat,不区分大小写
	var pattern1 = /[bc]at/i;

	// 匹配第一个[bc]at 不区分大小写
	var pattern2 = /\[bc\]at/i;
	
	// 匹配所有以at结尾的3个字符的组合，不区分大小写
	var pattern3 = /.at/gi;

	// 匹配所有.at组合，不区分大小写
	var pattern4 = /\.at/gi;
	 


2.RegExp 构造函数

	new RegExp（"匹配字符串模式", "flags(可选标志字符串） ");


由于RegExp构造函数的模式参数是字符串，所以在某些情况下要对字符进行双重转义。所有元字符都必须双重转义，那些已经转义过的字符也是如此，例如\n（字符\在字符串中通常被转义为\\，而在正则表达式字符串中就会变成\\\\）。



3.RegExp 实例方法

	+ exec("应用模式字符串") ，返回包含*第一个*匹配项信息的数组;或者没有匹配项的情况下返回null。
	
	index : 匹配项在字符串中的位置
	input : 应用正则表达式的字符串

	在数组中，第一项是与真个模式匹配的字符串，其它项是与模式中捕获匹配组的字符串（如果模式中没有捕获组，则该数组只包含一项）。

	var str = "oh, hello world, hello my country, hello my family this is my daling";
	var arr = /(hello?)/.exec(str);
	console.info (arr); 
	
	// 数组结果
	["hello", "hello", index: 4, input: "oh, hello world, hello my country, hello my family this is my daling"]

> 对于exec()方法而言，即使在模式中设置了全局标志（g），它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用exec()将始终返回第一个匹配项的信息。

	var text = "cat, bat, sat, fat";
	var pattern1 = /.at/;
	
	var matches = pattern1.exec(text);
	alert(matches.index); //0
	alert(matches[0]); //"cat"
	alert(pattern1.lastIndex); //0
	
	matches = pattern1.exec(text);
	alert(matches.index); //0
	alert(matches[0]); //"cat"
	alert(pattern1.lastIndex); //0
	
	var pattern2 = /.at/g;
	var matches = pattern2.exec(text);
	
	alert(matches.index); //0
	alert(matches[0]); //"cat"
	alert(pattern2.lastIndex); //0
	matches = pattern2.exec(text);
	
	alert(matches.index); //5
	alert(matches[0]); //"bat"
	alert(pattern2.lastIndex); //0

