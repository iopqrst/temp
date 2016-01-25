
var http=require('http');

var httpObj=http.createServer(function(request,response){
	console.log('进来了'+request.url);
	
	var GET={};
	
	if(request.url.indexOf('?')!=-1){
		var arr=request.url.split('?');	
		//arr[0]  /user
		//arr[1]  user=abc&pass=ppp
		var arr2=arr[1].split('&');
		//arr2[0]  user=abc
		//arr[1]	pass=ppp
		for(var i=0; i<arr2.length; i++){
			var arr3=arr2[i].split('=');
			GET[arr3[0]]=arr3[1];
		}
		
		console.log(GET);
	}
	
	response.end();
});

httpObj.listen(8080);