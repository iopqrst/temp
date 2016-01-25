

var mysql=require('mysql');

var db=mysql.createConnection({
	host:	'localhost',
	user:	'root',
	password:	'admin',
	database:	'2014-3-2'	
});

console.log(db);

