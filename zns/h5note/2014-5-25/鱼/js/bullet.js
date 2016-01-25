//版权 北京智能社©, 保留所有权利

function Bullet(type)
{
	//?type
	
	Sprite.call(this, _g_res['bullet'+type]);
	
	this.zindex=_g_zindex.bullet;

	this.speed=5;
	
	this.attack=type*10;
}

Bullet.prototype=new Sprite();
Bullet.prototype.constructor=Bullet;