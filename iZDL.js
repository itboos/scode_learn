/*
		桌面练习：**********************************
		 这里我们创建了一个自己经常使用的ZDL库函数，2015-12-3 16:13:32
		 实现方法：创建一个自执行的匿名函数，当用外部脚本映入我们的js库的时候
		 该匿名函数会自动执行，并且在在window下创建一个全局变量（如果该全局变量还不存在的时候）
		 接下来，我们在匿名函数内部定义了一些方法，并且将函数添加到我们创建的全局对象中，
		 这样我们在外面就可以通过ZDL.function();调用某个我们需要的方法了
*/
(function(){
	
	//alert("自执行的匿名函数执行了！！");
	//如果ZDL全局对象还不存在，则创建它
	if(!window.iZDL){
		window['iZDL']={};
	}
	//限制用户只能输入数字，bug:中文下文字可以输入
	//element为要限制输入的那个输入框元素
	function addOnlyNum(element){
		element.onkeypress=function(event){
			event=event|| window.event;
			keyCode=event.keyCode|| event.charCode;
			//alert(keyCode);
			
			/* 这里只能屏蔽英文输入状态下的字母输入，中文全部都可以输入
			使用正则表达式，使得用户只能输入数字
			注：keyCode>9的目的是使得用户可以使用一些特殊的键，
			如回车键，退格键，退格键的ASCII码为 8
			*/
			//根据字符编码解码获得相应的字符

			/*使用正则表达式的方法
			var num=String.fromCharCode(keyCode);
			if(!/\d/.test(num) && keyCode>9 )
				0-9数字的ASCII码为48-58
			*/
			if( !(keyCode>=48 && keyCode<=58) && keyCode>9 && !event.ctrlKey){

				//如果是退格键，则允许输入
				/*if(keyCode==8){
					return;
				}*/
				if(event.preventDefault){
					//其它浏览器阻止默认事件的发生
					event.preventDefault();
				}
				else{
					event.returnValue=false;
					alert("IE浏览器中的阻止事件默认行为的方法");
				}
			}
		
		}
	
	}
	//把我们创建的方法添加到我们创建的这个window下的全局对象ZDL中，
	//以便使用它，window.ZDL.addOnlyNum=ZDL.addOnlyNum
	window['iZDL']["addOnlyNum"]=addOnlyNum;

	//=================以后要添加的代码按照这种格式================================
		//这里是一个有用的小对象

		var EventUtil={
				//添加事件监听器（为某个事件添加一个函数，当该事件触发时，调用该函数）
				addHandler:function(element,type,handler){
					//如果支持DOM2级的addEventListener函数
					if(element.addEventListener){
						element.addEventListener(type,handler,false);

					}
					//如果支持IE的attacthEvent函数
					else if(element.attachEvent){
						//IE中的事件使用onclcik on+事件名
						element.attachEvent("on"+type,handler);
						alert("IE中的方法执行了");

					}
					else{
						//DOM0级支持的方法,应该所有浏览器都支持
						element["on"+type]=handler;
					}
				}
				,
				//移除事件监听器
				removeHandler:function(element,type,handler){
					//DOM2级支持的方法
					if(element.removeEventListener){
						element.removeEventListener(type,handler,false);
					}
					//IE中的方法
					else if(element.detachEvent){
						element.detachEvent("on"+type,handler);
						alert("IE中的移除函数方法执行了");

					}
					else{//DOM 0级支持的方法
						element["on"+type]=null;
					}
				}
				,
				
				//跨浏览器的事件对象
				//获取事件对象
				getEvent:function(event){
					return event?event:window.event;
					//event是其它浏览器的，window.event是IE中的
				}
				,
				//返回目标对象
				getTarget:function(event){
					return event.target|| event.srcElement;

				}
				,
				//阻止事件默认的行为
				preventDefault:function(event){
					if(event.preventDefault){
						event.preventDefault();
					}
					else{
						event.returnValue=false;
						alert("IE浏览器中的阻止事件默认行为的方法");
					}
				}
				,
				//阻止事件冒泡
				stopPropagation:function(event){
					if(event.stopPropagation){
						//主流浏览器阻止事件冒泡的方法
						event.stopPropagation();
						alert("使用event.stopPropagation来阻止事件冒泡");
					}
					else{
						event.cancelBubble=true;
						//IE浏览器中取消事件冒泡的方法
						alert("使用event.cancelBubble来阻止事件冒泡");
					}
				}

			,
			//获取鼠标移动的相关元素
			getRelatedTarget:function(event){
				if(event.relatedTarget){
					return event.relatedTarget;
				}
				else if(event.toElement){
					return event.toElement;
				}
				else if(event.fromElement){
					return event.fromElement;
				}
				else{
					return null;
				}
			}

			,
			//跨浏览器取得按键的键码 event对象有一个charCode属性(为字符的ACII码)，只在keypress按下时有效
			getCharCode:function(event){
				if(typeof event.charCode=="number"){
					return event.charCode;
				}
				else{
					return event.keyCode;
				}
			}

			,//2.操作剪贴板
			/*获取剪切板中的数据
			clipboardData对象在其它浏览器中是event对象包含的属性，而在IE中，是window对象的*/
			
			getClipboardText:function(event){
				
				var clipboardData=(event.clipboardData||window.clipboardData);
				return clipboardData.getData("text");
			}
			,
			//设置剪切板的数据 ???IE浏览器中有效，其它浏览器失败
			setClipboardText:function(event,value){
				//如果是其它浏览器
				if(event.clipboardData){
					alert("其它浏览器中的");
					return event.clipboardData.setData("text/plain",value);
				}
				//如果是IE浏览器
				else if(window.clipboardData){
					alert("IE浏览器中的");
					return window.clipboardData.setData("text",value);
				}
			}
			/*
				示列：
				window.onload=function(){
					alert("页面成功加载");
					var text=document.getElementById("text");

					iZDL.EventUtil.addHandler(text,"paste",function(event){
						
						event=iZDL.EventUtil.getEvent(event);
						var text=iZDL.EventUtil.getClipboardText(event);
						//确保粘贴的文本为数字，使用正则表达式，若不是数字，阻止默认事件的发生
						if(!/^\d*$/.test(text) ){
							iZDL.EventUtil.preventDefault(event);
						}
						
					})
			*/

			
		}
		
		window["iZDL"]["EventUtil"]=EventUtil;

//===========================================================
	//自动切换焦点，连续几个文本，在前一个文本输入的字符串达到指定的数字后，
	 //自动切换到下一个输入框中,没有考虑到隐藏的输入框
	function tabForward(event){
		event=iZDL.EventUtil.getEvent(event);
		var target=iZDL.EventUtil.getTarget(event);
		if(target.value.length==target.maxLength){
			var form=target.form;
			for(var i=0;i<form.elements.length;i++){
				if(form.elements[i]==target ){
					if(form.elements[i+1]){
						//下一个文本框获得焦点
						form.elements[i+1].focus();
					}
					return;
				}
			}
		}
	 }	

	 /*使用示列*/	
	 /*

	 	window.onload=function(){
	 		alert("页面成功加载");
	 		var text1=document.getElementById("text1");
	 		var text2=document.getElementById("text2");
	 		var text3=document.getElementById("text3");
	 		
	 		添加事件处理程序，keyup 按键弹起
	 		iZDL.EventUtil.addHandler(text1,"keyup",tabForward);
	 		iZDL.EventUtil.addHandler(text2,"keyup",tabForward);
	 		iZDL.EventUtil.addHandler(text3,"keyup",tabForward);

	 	}

	 	HTML部分：
	 		<form action="">
	 			<input type="text" id="text1" maxlength="3"/>
	 			<input type="text" id="text2" maxlength="4"/>
	 			<input type="text" id="text3" maxlength="4"/>
	 	 	</form>
	 */
	 window["iZDL"]["tabForward"]=tabForward;

	 //============================================
	 //获取select下拉选择框 （多选/单选） 所选择的的项的内容Value值
	 function getSelectedOption(selectbox){
	 	var result=new Array();
	 	var option=null;
	 	//遍历select的每一项，如果该项被选中，(option.selected=true)则把它添加到数组中
	 	for(var i=0;i<selectbox.options.length;i++){
	 		option=selectbox.options[i];
	 		if(option.selected){
	 			result.push(option);
	 		}
	 	}
	 	return result;
	 }
	 window["iZDL"]["getSelectedOption"]=getSelectedOption;
	 //使用例子：===================================================
	/* window.onload=function(){
	 	//alert("页面成功加载");
	 	//var box=document.forms[0].elements["fruit"];
	 	//var box=document.forms[0].elements[0];
	 	var check=document.getElementById("check");
	 	iZDL.EventUtil.addHandler(check,"click",function(){

	 		var box=document.getElementById("fruit");
	 		//获取某个option选项的文本和value值
	 		// var text=box.options[0].text;
	 		// var value=box.options[0].value;
	 		
	 		var selectedOption=getSelectedOption(box);
	 		var message="";
	 		for(var i=0;i<selectedOption.length;i++){
	 			message+="索引："+selectedOption[i].index+" ";
	 			message+="文本:"+selectedOption[i].text+" ";
	 			message+="选项值:"+selectedOption[i].value+" ";
	 			message+="\n\n";
	 		}
	 		alert(message);

	 	});
	 	HTML部分：
	 	<form action="http://www.baidu.com">
	 		<select name="fruit" id="fruit" multiple="multiple">
	 			<option value="apple" >苹果</option>
	 			<option value="banana" selected="selected">香蕉</option>
	 			<option value="peer" >梨</option>
	 			<option value="tudou">土豆</option>
	 		</select>
	 		<br/>
	 		<input type="button" id="check" value="查看"/>
	 	</form>
	 	*/
	 	//===============================================
	 	//序列化表单，使它成为一个查询字符串的形式 2015-12-4 23:03:24
	 	function serializeForm(form){
	 		var parts=[],
	 			field=null,
	 			i,len,j,optLen,option,optValue;
	 		for(i=0,len=form.elements.length;i<len;i++){
	 			//获取表单中的每一个元素
	 			field=form.elements[i];
	 			switch(field.type){
	 				//这两个为select下拉框
	 				case "select-one":
	 				case "select-multiple":
	 					if(field.name.length){
	 						for(j=0,optLen=field.options.length;j<optLen;j++){
	 							option=field.options[j];
	 							if(option.selected){
	 								optValue="";
	 								//如果是非IE浏览器
	 								if(option.hasAttribute){
	 									//如果select选项中有value属性，则用value属性，否则，用text
	 									optValue=(option.hasAttribute("value") ? option.value:option.text);
	 								}
	 								else{
	 									//如果是IE浏览器
	 									optValue=(option.attributes["value"].specified ? option.value:option.text);
	 								}
	 								//以name="zdl"的形式存入数组
	 								parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue) );
	 							}
	 						}
	 					}
	 					break;
	 				case undefined://字段集
	 				case "file"://文件输入
	 				case "submit"://提交按钮
	 				case "reset"://重置按钮
	 				case "button"://自定义按钮
	 					break;
	 				case "radio"://单选按钮
	 				case "checkbox"://复选框
	 					if(!field.checked){
	 						break;
	 					}
	 				//执行默认操作
	 				default:
	 					//不包含没有名字的表单字段
	 					if(field.name.length){
	 						parts.push(encodeURIComponent(field.name)+"="+
	 									encodeURIComponent(field.value) );
	 					}

	 			}


	 		}
	 		//将数组的每一项通过 “&” 连接起来，成为一个字符串,并且将这个表单返回
	 		return parts.join("&");

	 	}
	 	window["iZDL"]["serializeForm"]=serializeForm;



})()
