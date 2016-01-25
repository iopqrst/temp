function error(e){
	alert('错误:'+e.message);
}

function getList(fnSucc){
	webkitRequestFileSystem(PERSISTENT,2*1024*1024, requestSucc,error);
	
	function requestSucc(fs){
		var reader=fs.root.createReader();
		
		reader.readEntries(function(arr){
			fnSucc && fnSucc(arr);
		},error);
	}
}

function writeFile(name,content,fnSucc){
	webkitRequestFileSystem(PERSISTENT,2*1024*1024, requestSucc,error);
	
	function requestSucc(fs){
		fs.root.getFile(name,{create:true},openFileSucc,error);
	}
	
	function openFileSucc(fileEntry){
		fileEntry.createWriter(writerSucc,error);
	}
	
	function writerSucc(writer){
		writer.onerror=error;
		
		writer.onwriteend=function(){
			
			//真正的写入
			writer.onwriteend=function(){
				fnSucc && fnSucc();	
			}
			writer.write(new Blob([content]));	
		}
		
		writer.truncate(0);  //清空所有的数据
	}
}

function getFile(name,fnSucc){
	webkitRequestFileSystem(PERSISTENT,2*1024*1024,requestSucc,error);
	
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