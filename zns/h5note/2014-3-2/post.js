
var http=require('http');

var httpObj=http.createServer(function(request,response){
	console.log('进来了'+request.url);
	
	var POST={};
	var str='';
	request.addListener('data',function(s){
		str+=s;
	});
	
	request.addListener('end',function(){
		console.log('数据传完了： '+str);
		
		//user=abc&pass=ppp	
		var arr=str.split('&');
		for(var i=0; i<arr.length; i++){
			var arr2=arr[i].split('=');
			POST[arr2[0]]=arr2[1];
		}
		console.log(POST);
	});
	
	response.end();
});

httpObj.listen(8080);