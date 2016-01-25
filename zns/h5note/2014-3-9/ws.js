
var http=require('http');

var sock=require('socket.io');

var httpObj=http.createServer(function(request,response){
	
});

httpObj.listen(8080);


var ws=sock.listen(httpObj);

ws.on('connection',function(sock){
	console.log('有人访问ws');
});
