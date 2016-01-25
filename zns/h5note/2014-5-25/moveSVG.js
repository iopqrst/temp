//版权 北京智能社©, 保留所有权利

function startMoveSVG(obj, json)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;
		for(var name in json)
		{
			var cur=parseInt(obj.getAttribute(name)||getComputedStyle(obj, false)[name]);
			
			var speed=(json[name]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			cur+=speed;
			
			obj.setAttribute(name, cur);
			obj.style[name]=cur;
			
			if(cur!=json[name])
			{
				bStop=false;
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
		}
	}, 30);
}