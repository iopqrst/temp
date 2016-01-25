

var http=require('http');  //引入http模块


var httpObj=http.createServer(function(request,reponse){  //有人来访问这台服务器
	
	console.log('有人访问了');
	
});

httpObj.listen(8080);

