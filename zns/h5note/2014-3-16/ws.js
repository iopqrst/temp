
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

var ws=sock.listen(httpObj);

ws.on('connection',function(sock){
	//console.log('ws...coming');
	sock.on('fileData',function(json){
		//写文件
		fs.writeFile('www/'+json.name,json.data,function(err){
			console.log(err);
		});
	});
});








