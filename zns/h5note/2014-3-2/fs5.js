
var fs=require('fs');

fs.writeFile('a.txt','abc',function(err){
	console.log(err);
	
	fs.appendFile('a.txt','def',function(err){
		console.log('追加:'+err);
	})
	
	fs.readFile('a.txt','utf-8',function(err,data){
		if(err){
			console.log('404');	
		}else{
			console.log(data);	
		}	
	});
});
