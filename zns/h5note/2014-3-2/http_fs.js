
var http=require('http');
var fs=require('fs');


var httpObj=http.createServer(function(request,response){
	
	console.log('aaa');
	
	response.end();
});

httpObj.listen(8081);
