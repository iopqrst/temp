
var fs=require('fs');

fs.readFile('www/a.html','utf-8',function(err,data){
	if(err){
		console.log('404');	
	}else{
		console.log(data);	
	}	
});
