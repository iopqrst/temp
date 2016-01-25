//版权 北京智能社©, 保留所有权利

//type	1-5
function Fish(type)
{
	this.type=type;
	
	Sprite.call(this, _g_res['fish'+type]);
	
	this.frame_count=8;
	this.max_frame=4;
	
	this.zindex=_g_zindex.fish;
	
	this.speed=rnd(5,20)/10;
	
	this.hp=Math.pow(2, type-1)*10;
}

Fish.prototype=new Sprite();
Fish.prototype.constructor=Fish;