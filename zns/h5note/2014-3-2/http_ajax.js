
var http=require('http');
var querystring=require('querystring');

var httpObj=http.createServer(function(request,response){
	console.log('进来'+request.url);

	var GET={};
	var url='';
	
	if(request.url.indexOf('?')!=-1){
		var arr=request.url.split('?');
		//arr[0]
		GET=querystring.parse(arr[1]);
		url=arr[0];	
	}else{
		url=request.url;	
	}
	
	
	
	

	
	reponse.end();
});

httpObj.listen(8080);
