
var http=require('http');
var querystring=require('querystring');
var fs=require('fs');
var mysql=require('mysql');

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
		var db=mysql.createConnection({
			host:	'localhost',
			user:	'root',
			password:	'admin',
			database:	'2014-3-2'	
		});
		
		switch(GET.act){
			case 'login':
				db.query('SELECT * FROM user WHERE username="'+GET.username+'"',function(err,data){
					if(err){
						response.write('{err:1, desc:"数据库错误"}');
						response.end();	
					}else{
						console.log(data);
						
						if(data.length==0){
							response.write('{err:1, desc:"用户名不存在"}');	
							response.end();
						}else{
							if(data[0].password==GET.password){
								response.write('{err:0, desc:"登陆成功"}');	
							}else{
								response.write('{err:1, desc:"密码有错，用户名没错"}');	
							}
							response.end();	
						}
					}
				});
				break;
				
			case 'add':
				db.query('SELECT * FROM user WHERE username="'+GET.username+'"',function(err,data){
					//console.log(err);
					if(err){
						response.write('{err:1, desc:"数据库有错"}');
						response.end();	
					}else{
						console.log(data);
						
						if(data.length>0){
							response.write('{err:1, desc:"用户名已经存在"}');
							response.end();	
						}else{
							console.log('*********1');
							db.query('INSERT INTO user VALUES("'+GET.username+'","'+GET.password+'")',function(err,data){
								if(err){
									response.write('{err:1, desc:"数据库有错"}');
									response.end();		
								}else{
									response.write('{err:0, desc:"注册成功"}');
									response.end();
								}
															
							});
						}
					}
				});
				break;	
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
