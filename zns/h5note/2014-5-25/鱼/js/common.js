//版权 北京智能社©, 保留所有权利

var FPS=1000/60;

var _g_zindex={
	bg:		0,
	fish:	100,
	coin:	150,
	turret:	200,
	number:	250,
	bullet:	300,
	cannon:	500,
	button:	900
};

var _g_res={};

function loadRes(arr, fnEnd)
{
	//var result={};
	var imgs={};	//图片是否加载过
	
	var count=0;
	var total=0;
	var count_json=0;
	
	for(var i=0;i<arr.length;i++)
	{
		ajax(arr[i], function (str){
			count_json++;
			var json=JSON.parse(str);
			
			for(var name in json)
			{
				var src=json[name].src;
				
				if(!imgs[src])
				{
					imgs[src]=new Image();
					
					total++;
					
					imgs[src].onload=function ()
					{
						count++;
						
						if(
							//图片都加载完了
							count==total &&
							//json都加在完了
							count_json==arr.length
						)
						{
							fnEnd && fnEnd();
						}
					};
					imgs[src].src=src;
				}
				
				/*
					result={
						bottom: {img: 对象, x, y, w, h}
					}
				*/
				
				_g_res[name]={
					img: imgs[src],
					x: json[name].x, y: json[name].y,
					w: json[name].w, h: json[name].h
				};
			}
		}, function (){
			alert('加载失败，请刷新页面重新加载');
		});
	}
}

function getAng(json1, json2)
{
	var a=json1.x-json2.x;
	var b=json2.y-json1.y;
	
	var ang=90-a2d(Math.atan2(b,a));
	
	return ang;
}

Array.prototype.remove=Array.prototype.remove||function (n)
{
	for(var i=0;i<this.length;i++)
	{
		if(this[i]==n)
		{
			this.splice(i, 1);
			i--;
		}
	}
};




function rnd(n, m)
{
	return parseInt(Math.random()*(m-n)+n);
}

function a2d(n)
{
	return n*180/Math.PI;
}

function d2a(n)
{
	return n*Math.PI/180;
}