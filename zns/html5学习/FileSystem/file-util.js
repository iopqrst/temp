function error(e){
	alert('错误:'+e.message);
};

/**
 * 写文件
 */ 
function writeFile(name, content, sucFn) {
	webkitRequestFileSystem(PERSISTENT, 1024*1024, requestSuc, error);
	//请求成功
	function requestSuc(fs){
		fs.root.getFile(name, {create:true}, openFileSucc, error);
	};
	
	//打开文件
	function openFileSucc(fileEntry) {
		fileEntry.createWriter(writerSucc, error);
	};
	
	function writerSucc(writer) {
		writer.onwriteend = function(){				
			//真正的写入
			writer.onwriteend = function(){
				sucFn && sucFn();
			};
			writer.write(new Blob([content]));
		};

		writer.onerror = error;
		writer.truncate(0); //清空所有的数据
	};
};

/**
 * 读取文件
 */
function readFile(name, sucFn) {
	webkitRequestFileSystem(PERSISTENT, 1024 * 1024, requestSucc, error);
	
	function requestSucc(fs) {
		fs.root.getFile(name, null, openSucc, error);
	};
	
	function openSucc(fileEntry) {
		fileEntry.file(function(file){
			var reader = new FileReader();
			
			reader.onload = function(){
				sucFn && sucFn(this.result);
			};
			
			reader.onerror = error;
			reader.readAsText(file);
		});
	};
};

/**
 * 获取文件列表
 */
function getFileList(fnSucc) {
			
	webkitRequestFileSystem(PERSISTENT, 1024*1024,requestSucc, error);
	
	function requestSucc(fs){
		var reader = fs.root.createReader();
		reader.readEntries(function(arr){
			fnSucc && fnSucc(arr);
		}, error);
	};
	
};

/**
 * 创建临时标签，替换模板文件内容
 */
function myTpl(obj, data) {
	var oTmp = document.createElement('tmp');
	//outerHTML去的自身元素标签
	oTmp.innerHTML = obj.outerHTML.replace(/\{\$\w+\}/g , function(s){
		s = s.substring(2,s.length-1);
		return data[s];
	}); 
	
	oTmp.children[0].id='';
	return oTmp.children[0];
};