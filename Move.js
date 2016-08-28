	//小小的愚弄的那个框架:2016-4-22 15:46:22
	/*1.取得DOM的类名
		  2.把字符串中的多个空格替换成一个空格
		  3.分割字符串，用空格将字符串分割成一个数组
		  4.遍历这个数组，查看匹配情况
		*/
		function getByClass(oParent,className){
			var res=[];
			var elements=oParent.getElementsByTagName("*");
			for(var i=0;i<elements.length;i++){
				//2.把字符串中的多个空格替换成一个空格
				var aCnames=elements[i].className.replace(/\s+/g, ' ');
				//console.log(aCnames);
				
				//3.分割字符串，用空格将字符串分割成一个数组
				aCnames=aCnames.split(" ");
				//console.log(aCnames);
				for(var j=0;j<aCnames.length;j++){
					//console.log(aCnames[j]);
					if(aCnames[j]==className){
						res.push(elements[i]);
						break;
					}
				}
			  }

			 return res;
		};
	//合并两个对象的属性，第二个对象会覆盖第一个对象的同名属性,返回一个新的对象
	function extendObj(o1,o2){
		var newObj={};
		if(o1){
			for(var p in o1){
				newObj[p]=o1[p]; //复制对象o1的所有属性到newObj
			}
		}
		
		if(o2){
			for(var p in o2){
				newObj[p]=o2[p]; //复制对象o2的所有属性到newObj
			}
		}
		
		return newObj;
	}
	//获取某个CSS的属性的值
	function getStyle(obj,attr){
		if(obj.currentStyle){ //IE下
			return obj.currentStyle[attr];
		}else{
			//火狐下
			return window.getComputedStyle(obj,false)[attr];
		}
	};
	//缓冲运动函数,一定可以达到一个具体的目标点	
	function startMove(obj,json,fn){
		
		clearInterval(obj.timer);
		
		obj.timer=setInterval(function(){
			var bStop=true;		//这一次运动就结束了——所有的值都到达了
			 for(var attr in json){
			 	//1.取当前值
			 	var iCurrent=0; 
			 	if(attr=="opacity"){
			 		//IE下为0-100,不需要乘100，W3C下的需要
			 		iCurrent=parseFloat(getStyle(obj,attr) )>1 ?parseFloat(getStyle(obj,attr) ):parseFloat(getStyle(obj,attr) )*100;
			 		//console.log(iCurrent);
			 	}else{
			 		iCurrent=parseInt(getStyle(obj,attr)); // 获取当前某个属性的值
			 	}
			 	
			 	//console.log(iCurrent); 
			 	//2.算速度 
			 	var iSpeed=(json[attr]-iCurrent)/8;
			 	//console.log(iSpeed);
			 	iSpeed=iSpeed>0? Math.ceil(iSpeed):Math.floor(iSpeed);
			 	//console.log(iSpeed);
			 	//3.检测停止,必须所有的属性都到达目标值
			 	if(iCurrent!=json[attr]){
			 		bStop=false;
			 		
			 	}
			 	
			 	if(attr=="opacity"){
			 			obj.style.opacity=(iCurrent+iSpeed)/100;
			 			obj.style.filter="alpha(opacity:"+(iCurrent+iSpeed)+")";
			 			
			 		}else{
			 			obj.style[attr]=iCurrent+iSpeed+"px";
			 			//console.log(obj.style[attr]);
			 		}
			 		
			 	
			 }

			 //如果bStop为真，说明所有属性都到达目标值了
			 if(bStop){
			 	clearInterval(obj.timer);
			 	
			 	if(fn)
			 	{
			 		fn();
			 	}
			 }
			},30);
		};