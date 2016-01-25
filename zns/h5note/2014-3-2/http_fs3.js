
var http=require('http');
var fs=require('fs');

var httpObj=http.createServer(function(request,response){
	
	console.log(request.url);
	
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
