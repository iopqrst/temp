
var fs=require('fs');

fs.readFile('1.jpg',function(err,data){
	//console.log(err);
	if(err){
		console.log('文件读取失败');	
	}else{
		console.log(data);	
	}
});
