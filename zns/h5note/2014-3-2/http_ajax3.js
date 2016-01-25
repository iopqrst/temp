
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
		if(GET.username=='abc' && GET.password=='123'){
			response.write('{err:0, desc:"登陆成功"}');
			response.end();
		}else{
			response.write('{err:1, desc:"登陆失败"}');
			response.end();
		}
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
