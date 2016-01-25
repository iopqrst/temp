//版权 北京智能社©, 保留所有权利

//type	1-2
function Coin(type)
{
	this.type=type;
	Sprite.call(this, _g_res['coin'+type]);
	
	this.frame_count=3;
	this.max_frame=10;
	
	this.zindex=_g_zindex.coin;
	
	this.target={x: 103, y: 570};
}

Coin.prototype=new Sprite();
Coin.prototype.constructor=Coin;