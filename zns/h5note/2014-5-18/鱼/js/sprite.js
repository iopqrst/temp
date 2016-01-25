//版权 北京智能社©, 保留所有权利

/*
data->img,x,y,w,h
*/

var id=1;

function Sprite(data)
{
	if(!data)return;
	
	this.data=data;
	
	//物体的属性
	this.width=data.w;
	this.height=data.h;
	
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
	
	this.id=id++;
}

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
	if(this.speed)
	{
		var speedX=Math.sin(d2a(this.move_rotate))*this.speed;
		var speedY=Math.cos(d2a(this.move_rotate))*this.speed;
		
		this.left+=speedX;
		this.top-=speedY;
	}
};







