
var fs=require('fs');

fs.writeFile('a.txt','abcdefg生活是什么？',function(err){
	console.log(err);
	
	fs.readFile('a.txt','utf-8',function(err,data){
		if(err){
			console.log('404');	
		}else{
			console.log(data);	
		}	
	});
});
