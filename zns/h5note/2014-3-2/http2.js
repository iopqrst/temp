

var http=require('http');  //引入http模块


var httpObj=http.createServer(function(request,response){  //有人来访问这台服务器
	
	//request   请求     浏览器->服务器    输入
	//response  响应     服务器->浏览器    输出
	
	console.log('有人访问了');
	
	response.write('{"name":"zhangsan"}');
	response.end();
	
});

httpObj.listen(8080);

