
var http=require('http');

var sock=require('socket.io');

var fs=require('fs');

var httpObj=http.createServer(function(request,response){
	
	fs.readFile('www'+request.url,function(err,data){
		if(err){
			response.write('404');	
		}else{
			response.write(data);	
		}
		response.end();
	});
});

httpObj.listen(8080);

//以下是websocket


var ws=sock.listen(httpObj);

ws.on('connection',function(sock){
	//console.log('有人访问ws');
	sock.on('msg',function(data){
		console.log(data);
	});
});

















