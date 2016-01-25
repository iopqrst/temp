
var http=require('http');

var httpObj=http.createServer(function(request,response){
	console.log('有人访问http');
	
	response.end();
});

httpObj.listen(8080);

