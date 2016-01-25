function error(e){
	alert('错误:'+e.message);
}

function getList(path,fnSucc){
	webkitRequestFileSystem(PERSISTENT, 2*1024*1024, requestSucc,error);
	
	function requestSucc(fs){
		fs.root.getDirectory(path,null,getDirSucc,error);
	}
	
	function getDirSucc(dir){
		var reader=dir.createReader();
		
		reader.readEntries(function(arr){
			fnSucc && fnSucc(arr);
		},error);
	}
}

function delFile(path,fnSucc){
	webkitRequestFileSystem(PERSISTENT, 2*1024*1024, requestSucc,error);

	function requestSucc(fs){
		fs.root.getFile(path,null,openFileSucc,error);
	}
	
	function openFileSucc(file){
		file.remove(fnSucc, error);
	}
}

function createDir(path,fnSucc){
	webkitRequestFileSystem(PERSISTENT, 2*1024*1024, requestSucc,error);
	
	function requestSucc(fs){
		fs.root.getDirectory(path,{create:true},fnSucc,error);
	}
}

function delDir(path,fnSucc){
	webkitRequestFileSystem(PERSISTENT, 2*1024*1024, requestSucc,error);

	function requestSucc(fs){
		fs.root.getDirectory(path,null,getDirSucc,error);	
	}
	
	function getDirSucc(dir){
		getList(path,function(arr){
			var i=0;
			
			function next(){
				
				function delOk(){
					i++;
					
					if(i==arr.length){
						dir.remove(fnSucc,error);	
					}else{
						next();	
					}	
				}
				
				if(arr[i].isDirectory){
					delDir(path+arr[i].name+'/',delOk);
				}else{
					delFile(path+arr[i].name,delOk);	
				}	
			}
			
			if(arr.length==0){
				dir.remove(fnSucc,error);	
			}else{
				next();
			}
		});
	}
}














