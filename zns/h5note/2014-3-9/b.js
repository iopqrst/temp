
this.onmessage=function(ev){
	
	var res=0;
	for(var i=0; i<ev.data.length; i++){
		res+=ev.data[i];
	}
	
	this.postMessage(res);	
	
}
