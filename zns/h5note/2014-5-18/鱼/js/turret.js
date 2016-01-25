//版权 北京智能社©, 保留所有权利

function Turret(type)
{
	//?type
	
	Sprite.call(this, _g_res['bottom']);
	
	this.zindex=_g_zindex.turret;
}

Turret.prototype=new Sprite();
Turret.prototype.constructor=Bullet;