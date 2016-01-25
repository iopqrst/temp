//版权 北京智能社©, 保留所有权利

function Scene(id)
{
	var _this=this;
	
	var oC=document.getElementById(id);
	var gd=oC.getContext('2d');
	
	this.width=oC.width;
	this.height=oC.height;
	
	this.child=[];		//场景里的对象
	
	setInterval(function (){
		_this.onenterframe && _this.onenterframe();
		
		gd.clearRect(0,0,oC.width,oC.height);
		
		//zindex排序?
		_this.child.sort(function (sprite1, sprite2){
			if(sprite1.zindex==sprite2.zindex)
			{
				return sprite1.id-sprite2.id;
			}
			else
			{
				return sprite1.zindex-sprite2.zindex;
			}
			//
		});
		
		for(var i=0;i<_this.child.length;i++)
		{
			_this.child[i].draw(gd);
			_this.child[i].nextFrame();
		}
	}, FPS);
}

Scene.prototype.add=function (obj)
{
	this.child.push(obj);
};

Scene.prototype.remove=function (obj)
{
	this.child.remove(obj);
};



