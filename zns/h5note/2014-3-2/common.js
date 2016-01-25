
exports.url2json=function(str){
	var json={};
	
	if(str=='')return {};
	
	var arr=str.split('&');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		json[arr2[0]]=arr2[1];
	}
	
	return json;	
}
