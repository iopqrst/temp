//版权 北京智能社©, 保留所有权利

//type	1-7
function Cannon(type)
{
	this.type=type;
	
	Sprite.call(this, _g_res['cannon'+type]);
	
	this.zindex=_g_zindex.cannon;
	
	this.onanimateend=function ()
	{
		this.stopAni();
	};
	
	//开炮频率
	this.shot_interval=500;
	this.last_shot=0;
}

Cannon.prototype=new Sprite();
Cannon.prototype.constructor=Cannon;

Cannon.prototype.setType=function (type)
{
	this.type=type;
	
	this.setData(_g_res['cannon'+type]);
};

Cannon.prototype.getType=function ()
{
	return this.type;
};

Cannon.prototype.isReady=function ()
{
	var now=new Date().getTime();
	
	if(now-this.last_shot<this.shot_interval)
	{
		return false;
	}
	else
	{
		this.last_shot=now;
		
		return true;
	}
};

Cannon.prototype.startAni=function ()
{
	this.frame_count=4;
	this.max_frame=5;
};






