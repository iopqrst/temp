//版权 北京智能社©, 保留所有权利

(function (){
	var isIE=navigator.userAgent.search(/msie [6-8]/i)!=-1;
	
	function a2d(n)
	{
		return n*180/Math.PI;
	}
	function d2a(n)
	{
		return n*Math.PI/180;
	}
	
	window.ZVector=ZVector;
	
	function ZVector()
	{
		//命名空间、样式
		if(isIE)
		{
			document.namespaces.add("zns", "urn:schemas-microsoft-com:vml");
		
			document.createStyleSheet().addRule("zns\\:*", "behavior:url(#default#VML);position:absolute;");
		}
	}
	
	function create(tagName)
	{
		if(isIE)
		{
			return document.createElement(tagName);
		}
		else
		{
			return document.createElementNS('http://www.w3.org/2000/svg', tagName);
		}
	}
	
	if(isIE)
	{
		ZVector.prototype.createContainer=function (w, h)
		{
			var obj=create('zns:group');
			
			obj.style.width=w+'px';
			obj.style.height=h+'px';
			
			obj.coordsize=w+','+h;
			
			//
			obj.addChild=function (child)
			{
				if(child.length)	//数组
				{
					for(var i=0;i<child.length;i++)
					{
						obj.appendChild(child[i]);
					}
				}
				else
				{
					obj.appendChild(child);
				}
			};
			
			return obj;
		};
		
		ZVector.prototype.createRect=function (x, y, w, h)
		{
			var obj=create('zns:rect');
			
			obj.style.left=x;
			obj.style.top=y;
			obj.style.width=w;
			obj.style.height=h;
			
			return obj;
		};
		
		ZVector.prototype.createPie=function (cx, cy, r, s, e)
		{
			if(e-s<180)
			{
				var obj=create('zns:arc');
				
				obj.style.width=r*2;
				obj.style.height=r*2;
				obj.style.left=cx-r;
				obj.style.top=cy-r;
				
				obj.startangle=s;
				obj.endangle=s+180;
				
				return obj;
			}
			else
			{
				var obj1=create('zns:arc');
				
				obj1.style.width=r*2;
				obj1.style.height=r*2;
				obj1.style.left=cx-r;
				obj1.style.top=cy-r;
				
				obj1.startangle=s;
				obj1.endangle=s+180;
				
				var obj2=create('zns:arc');
				
				obj2.style.width=r*2;
				obj2.style.height=r*2;
				obj2.style.left=cx-r;
				obj2.style.top=cy-r;
				
				obj2.startangle=e-180;
				obj2.endangle=e;
				
				return [obj1, obj2];
			}
		};
		
		//设置...
		ZVector.prototype.setStroke=function (obj, color, size)
		{
			if(obj.length)
			{
				for(var i=0;i<obj.length;i++)
				{
					if(color)
					{
						obj[i].strokecolor=color;
					}
					if(size)
					{
						obj[i].strokeweight=size;
					}
				}
			}
			else
			{
				if(color)
				{
					obj.strokecolor=color;
				}
				if(size)
				{
					obj.strokeweight=size;
				}
			}
		};
		
		ZVector.prototype.setFill=function (obj, color)
		{
			if(obj.length)
			{
				for(var i=0;i<obj.length;i++)
				{
					obj[i].fillcolor=color;
				}
			}
			else
			{
				obj.fillcolor=color;
			}
		};
	}
	else
	{
		ZVector.prototype.createContainer=function (w, h)
		{
			var obj=create('svg');
			
			obj.setAttribute('width', w);
			obj.setAttribute('height', h);
			
			obj.addChild=function (child)
			{
				if(child.length)	//数组
				{
					for(var i=0;i<child.length;i++)
					{
						obj.appendChild(child[i]);
					}
				}
				else
				{
					obj.appendChild(child);
				}
			};
			
			return obj;
		};
		
		ZVector.prototype.createRect=function (x, y, w, h)
		{
			var obj=create('rect');
			
			obj.setAttribute('x', x);
			obj.setAttribute('y', y);
			obj.setAttribute('width', w);
			obj.setAttribute('height', h);
			
			return obj;
		};
		
		ZVector.prototype.createPie=function (cx, cy, r, s, e)
		{
			var obj=create('path');
			
			var big=0;
			if(e-s>180)
			{
				big=1;
			}
			
			//起点的x,y
			var a=Math.sin(d2a(s))*r;
			var b=Math.cos(d2a(s))*r;
			
			var sx=cx+a;
			var sy=cy-b;
			
			//终点的x,y
			var a=Math.sin(d2a(e))*r;
			var b=Math.cos(d2a(e))*r;
			
			var ex=cx+a;
			var ey=cy-b;
			
			var arr=[];
			
			arr.push('M '+cx+' '+cy);
			arr.push('L '+sx+' '+sy);
			arr.push('A '+r+' '+r+' '+(e-s)+' '+big+' 1 '+ex+' '+ey);
			arr.push('Z');
			
			obj.setAttribute('d', arr.join(' '));
			
			return obj;
		};
		
		ZVector.prototype.setStroke=function (obj, color, size)
		{
			if(color)
			{
				obj.style.stroke=color;
			}
			if(size)
			{
				obj.style.strokeWidth=size;
			}
		};
		
		ZVector.prototype.setFill=function (obj, color)
		{
			obj.style.fill=color;
		};
	}
})();