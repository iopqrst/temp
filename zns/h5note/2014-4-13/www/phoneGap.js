function error(e){
	alert('错误:'+e.message);
}

function getList(path,fnSucc){
	requestFileSystem(LocalFileSystem.PERSISTENT,2*1024*1024, requestSucc,error);
	
	function requestSucc(fs){
		fs.root.getDirectory(path,null,getDirSucc,error);
	}
	
	function getDirSucc(dir){
		var reader=dir.createReader();
		
		reader.readEntries(function(arr){
			fnSucc && fnSucc(arr);	
		});
	}
}

function writeFile(name,content,fnSucc){
	requestFileSystem(LocalFileSystem.PERSISTENT,2*1024*1024, requestSucc,error);
	
	function requestSucc(fs){
		fs.root.getFile(name,{create:true},openFileSucc,error);
	}
	
	function openFileSucc(fileEntry){
		fileEntry.createWriter(writerSucc,error);
	}
	
	function writerSucc(writer){
		writer.onerror=error;
		
		writer.onwriteend=function(){
			fnSucc && fnSucc();	
		}
		writer.write(content);	
	}
}

function getFile(name,fnSucc){
	requestFileSystem(LocalFileSystem.PERSISTENT,2*1024*1024,requestSucc,error);
	
	function requestSucc(fs){
		fs.root.getFile(name,null,openFileSucc,error);
	}
	
	function openFileSucc(fileEntry){
		fileEntry.file(function(file){
			var reader=new FileReader();
			
			reader.onload=function(){
				fnSucc && fnSucc(this.result);	
			}
			
			reader.onerror=error;
			
			reader.readAsText(file);
		});
	}
}




function myTpl(obj,data){
	var oTmp=document.createElement('tmp');
	
	oTmp.innerHTML=obj.outerHTML.replace(/\{\$\w+\}/g,function(s){
		s=s.substring(2,s.length-1);
		
		return data[s];
	});
	
	oTmp.children[0].id='';
	return oTmp.children[0];
	
}