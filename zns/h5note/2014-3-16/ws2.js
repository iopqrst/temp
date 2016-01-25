
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
		console.log(json.data.substring(0,100));
		var data=json.data.replace(/^data:(\w+\/\w+)?;base64,/,'');
		//data:image/jpeg;base64,
		//写文件
		fs.writeFile('www/'+json.name,data,'base64',function(err){
			console.log(err);
		});
	});
});








