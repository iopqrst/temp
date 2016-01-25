
var http=require('http');
var com=require('./common');

var httpObj=http.createServer(function(request,response){
	console.log('进来了'+request.url);
	
	var GET={};
	
	if(request.url.indexOf('?')!=-1){
		var arr=request.url.split('?');	
		//arr[0]  /user
		//arr[1]  user=abc&pass=ppp
		GET=com.url2json(arr[1]);
		
		console.log(GET);
	}
	
	response.end();
});

httpObj.listen(8080);