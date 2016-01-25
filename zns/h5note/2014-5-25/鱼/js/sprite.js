//版权 北京智能社©, 保留所有权利

/*
data->img,x,y,w,h
*/

var id=1;

function Sprite(data)
{
	if(!data)return;
	
	this.setData(data);
	
	//基本属性
	//物体的中心
	this.left=0;
	this.top=0;
	
	this.rotate=0;
	
	this.scaleX=1;
	this.scaleY=1;
	
	//动画
	this.frame_count=0;		//0-不动
	this.cur_frame=0;
	
	this.max_frame=4;
	
	//层级
	this.zindex=0;			//越大，越高
	
	//运动
	this.move_rotate=0;
	this.speed=0;
	
	this.target=null;	//{x: 12, y: 33}
	
	this.id=id++;
}

Sprite.prototype.setData=function (data)
{
	this.data={};
	for(var i in data)
	{
		this.data[i]=data[i];
	}
	
	//物体的属性
	this.width=data.w;
	this.height=data.h;
};

Sprite.prototype.draw=function (gd)
{
	var d=this.data;
	
	gd.save();
	
	gd.translate(this.left, this.top);
	
	gd.rotate(d2a(this.rotate));
	
	gd.scale(this.scaleX,this.scaleY);
	
	gd.drawImage(
		d.img,
		d.x, d.y, d.w, d.h,
		-d.w/2, -d.h/2, d.w, d.h
	);
	
	gd.restore();
};

Sprite.prototype.stopAni=function ()
{
	this.frame_count=0;
	this.max_frame=0;
};

Sprite.prototype.nextFrame=function ()
{
	//动画
	if(this.frame_count && this.max_frame)
	{
		this.cur_frame++;
		
		var cur=Math.floor(this.cur_frame/this.frame_count);
		
		this.data.y=(cur%this.max_frame)*this.data.h;
		
		if(this.cur_frame%(this.frame_count*this.max_frame)==0)
		{
			//this.max_frame=0;
			this.onanimateend && this.onanimateend();
		}
	}
	
	//运动
	if(this.target)
	{
		var speedX=(this.target.x-this.left)/30;
		speedX=speedX>0?Math.ceil(speedX):Math.floor(speedX);
		
		var speedY=(this.target.y-this.top)/30;
		speedY=speedY>0?Math.ceil(speedY):Math.floor(speedY);
		
		this.left+=speedX;
		this.top+=speedY;
		
		if(Math.abs(this.left-this.target.x)<1 && Math.abs(this.top-this.target.y)<1)
		{
			this.onmoveend && this.onmoveend();
		}
	}
	else if(this.speed)
	{
		var speedX=Math.sin(d2a(this.move_rotate))*this.speed;
		var speedY=Math.cos(d2a(this.move_rotate))*this.speed;
		
		this.left+=speedX;
		this.top-=speedY;
	}
};

//按照方形检测
//l,r,t,b——x,y
Sprite.prototype.pointInRect=function (x, y)
{
	var l=this.left-this.width/2;
	var t=this.top-this.height/2;
	var r=this.left+this.width/2;
	var b=this.top+this.height/2;
	
	if(l<=x && x<=r && t<=y && y<=b)
	{
		return true;
	}
	else
	{
		return false;
	}
};

//按照圆形检测
//cx,cy,r——x,y
//r=max(width,height)
Sprite.prototype.pointInCircle=function (x, y)
{
	var cx=this.left;
	var cy=this.top;
	var r=Math.max(this.width, this.height)/2;
	
	var a=x-cx;
	var b=y-cy;
	
	var dis=Math.sqrt(a*a+b*b);
	
	if(dis<=r)
	{
		return true;
	}
	else
	{
		return false;
	}
};

//碰撞检测
//我是c-circle		对方也是c-circle
Sprite.prototype.collTestCC=function (sprite)
{
	var a=this.left-sprite.left;
	var b=this.top-sprite.top;
	
	var dis=Math.sqrt(a*a+b*b);
	
	var r1=Math.max(this.width,this.height)/2;
	var r2=Math.max(sprite.width,sprite.height)/2;
	
	r1*=0.8;
	r2*=0.8;
	
	if(r1+r2>dis)
	{
		return true;
	}
	else
	{
		return false;
	}
};








