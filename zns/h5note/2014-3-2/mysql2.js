

var mysql=require('mysql');

var db=mysql.createConnection({
	host:	'localhost',
	user:	'root',
	password:	'admin',
	database:	'2014-3-2'	
});

db.query('SELECT * FROM user',function(err,data){
	//console.log(err);
	if(err){
		console.log('数据库错误');	
	}else{
		console.log(data);	
	}
});

