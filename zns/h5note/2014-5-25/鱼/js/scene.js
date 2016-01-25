//版权 北京智能社©, 保留所有权利

function Scene(id)
{
	var _this=this;
	
	var oC=document.getElementById(id);
	var gd=oC.getContext('2d');
	
	this.width=oC.width;
	this.height=oC.height;
	
	this.child=[];		//场景里的对象
	this.ev_list=[];	//场景里所有的事件
	
	//绘制、移动、排序
	setInterval(function (){
		_this.onenterframe && _this.onenterframe();
		gd.clearRect(0,0,oC.width,oC.height);
		
		//zindex排序?
		_this.child.sort(function (sprite1, sprite2){
			if(sprite1.zindex==sprite2.zindex)
			{
				return sprite1.id-sprite2.id;	//不好
			}
			else
			{
				return sprite1.zindex-sprite2.zindex;
			}
			//
		});
		
		//绘制、移动
		for(var i=0;i<_this.child.length;i++)
		{
			_this.child[i].draw(gd);
			_this.child[i].nextFrame();
		}
	}, FPS);
	
	//事件——不是所有对象都需要检测事件
	//告诉场景——哪些对象需要检测
	/*
	oC.onmousedown=function (ev)
	{
		var x=ev.clientX-oC.offsetLeft;
		var y=ev.clientY-oC.offsetTop;
		
		for(var i=0;i<_this.ev_list.length;i++)
		{
			var a=_this.ev_list[i];
			
			if(a.ev!='down')continue;
			
			switch(a.type)
			{
				case 'rect':
					if(a.obj.pointInRect(x, y))
					{
						a.fn();
					}
					break;
				case 'circle':
					if(a.obj.pointInCircle(x, y))
					{
						a.fn();
					}
					break;
			}
		}
	};
	oC.onmouseup=function (ev)
	{
		var x=ev.clientX-oC.offsetLeft;
		var y=ev.clientY-oC.offsetTop;
		
		for(var i=0;i<_this.ev_list.length;i++)
		{
			var a=_this.ev_list[i];
			
			if(a.ev!='up')continue;
			
			switch(a.type)
			{
				case 'rect':
					if(a.obj.pointInRect(x, y))
					{
						a.fn();
					}
					break;
				case 'circle':
					if(a.obj.pointInCircle(x, y))
					{
						a.fn();
					}
					break;
			}
		}
	};
	*/
	
	function _addEv(canvasEvName, evName)
	{
		oC[canvasEvName]=function (ev)
		{
			var x=ev.clientX-oC.offsetLeft;
			var y=ev.clientY-oC.offsetTop;
			
			var myEv={x: x, y: y};
			
			for(var i=0;i<_this.ev_list.length;i++)
			{
				var a=_this.ev_list[i];
				
				if(a.ev!=evName)continue;
				
				if(a.obj)
				{
					switch(a.type)
					{
						case 'rect':
							if(a.obj.pointInRect(x, y))
							{
								a.fn(myEv);
								
								if(a.stop)
								{
									return;
								}
							}
							break;
						case 'circle':
							if(a.obj.pointInCircle(x, y))
							{
								a.fn(myEv);
								if(a.stop)
								{
									return;
								}
							}
							break;
					}
				}
				else
				{
					a.fn(myEv);
					if(a.stop)
					{
						return;
					}
				}
			}
		};
	}
	
	_addEv('onmousedown', 'down');
	_addEv('onmouseup', 'up');
	_addEv('onclick', 'click');
	_addEv('onmousemove', 'move');
}

Scene.prototype.add=function (obj)
{
	this.child.push(obj);
};

Scene.prototype.remove=function (obj)
{
	this.child.remove(obj);
};

/*
ev事件名->'down'/'up'
type检测方式->'rect'/'circle'
*/
//全屏事件
Scene.prototype.addEvent=function (obj, options)
{
	//ev, type, fn
	options=options||{};
	options.type=options.type||'rect';
	options.stop=options.stop||false;
	
	this.ev_list.push({
		obj:	obj,
		ev:		options.ev,
		fn:		options.fn,
		type:	options.type,
		stop:	options.stop
	});
};








