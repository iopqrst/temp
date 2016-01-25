
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

var arrSock=[];
ws.on('connection',function(sock){
	arrSock.push(sock);
	
	sock.on('dragMsg',function(json){
		for(var i=0; i<arrSock.length; i++){
			if(arrSock[i]==sock)continue;
			
			arrSock[i].emit('moveMsg',json);
		}
	});
});

















