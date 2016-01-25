//版权 北京智能社©, 保留所有权利

function Turret(scene)
{
	Sprite.call(this, _g_res['bottom']);
	
	this.zindex=_g_zindex.turret;
	
	//数字
	
	//6个Sprite
	this.aScore=[];
	for(var i=0;i<6;i++)
	{
		this.aScore[i]=new Sprite(_g_res['score']);
		this.aScore[i].left=48+23*i;
		this.aScore[i].top=586;
		
		this.aScore[i].zindex=_g_zindex.number;
		
		scene.add(this.aScore[i]);
	}
	
	//this.score=1000;
	this.setScore(1000);
}

Turret.prototype=new Sprite();
Turret.prototype.constructor=Turret;


Turret.prototype.setScore=function (score)
{
	this.score=score;
	
	var str=''+score;
	
	while(str.length<6)
	{
		str='0'+str;
	}
	
	for(var i=0;i<str.length;i++)
	{
		var n=parseInt(str.charAt(i));
		
		this.aScore[i].data.y=(9-n)*this.aScore[i].data.h;
	}
};

Turret.prototype.getScore=function ()
{
	return this.score;
};






