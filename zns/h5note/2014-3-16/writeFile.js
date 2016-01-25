
var fs=require('fs');

fs.writeFile('www/abc.txt','abcdeg',function(err){
	console.log(err);
});