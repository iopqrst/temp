

var http=require('http');  //引入http模块


var httpObj=http.createServer(function(request,response){  //有人来访问这台服务器
	
	//request   请求     浏览器->服务器    输入
	//response  响应     服务器->浏览器    输出
	
	console.log(request.url);
	
	switch(request.url){
		case '/a.html':
			response.write('<html><head><title>首页</title></head><body><div style="width:300px; height:300px; background:red"></div></body></htm>');
			break;
		
		case '/b.html':
			response.write('<html><head><title>首页</title></head><body><div style="width:300px; height:300px; background:#ff0;"></div></body></htm>');
			break;
			
		default:
			response.write('404');
			break;
	}
	response.end();
	
});

httpObj.listen(8182);

