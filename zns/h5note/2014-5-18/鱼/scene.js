//版权 北京智能社©, 保留所有权利

function Scene(id)
{
	var _this=this;
	
	var oC=document.getElementById(id);
	var gd=oC.getContext('2d');
	
	this.child=[];		//场景里的对象
	
	setInterval(function (){
		gd.clearRect(0,0,oC.width,oC.height);
		
		for(var i=0;i<_this.child.length;i++)
		{
			_this.child[i].draw(gd);
		}
	}, FPS);
}

Scene.prototype.add=function (obj)
{
	this.child.push(obj);
};