
var http=require('http');
var querystring=require('querystring');
var fs=require('fs');

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
	
	
	if(url=='/user'){   //ajax
		
	}else{
		
		fs.readFile('www'+request.url,function(err,data){
			if(err){
				response.write('404');	
			}else{
				response.write(data);	
			}
			response.end();
		});
	}
	

	
	
});

httpObj.listen(8080);
