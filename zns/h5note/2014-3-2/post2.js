
var http=require('http');
var com=require('./common');

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
		POST=com.url2json(str);
		console.log(POST);
	});
	
	response.end();
});

httpObj.listen(8182);