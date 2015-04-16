var info;
var showconfig = false;
var configMenuStatus = false;
var menuNum=0;
window.onload = function() {
	onloadEV();
	info = _getEi();
}

function showMenu(){
	parent.windowMask();//为了实现点击非弹出区域时，弹出区域消失

	var configMenuDiv = parent.document.getElementById("configMenuDiv");
	if(configMenuDiv==null){
		/*根据权限调整菜单是否显示*/
		var num = filterMenu();
		if(num==0){
			return ;
		}
		configMenuDiv=document.getElementById("configMenuDiv");
		configMenuDiv.popdiv='true'
		configMenuDiv.style.position="absolute";
		configMenuDiv.style.width="144px";
		configMenuDiv.style.top="9%";
		configMenuDiv.style.left="88.5%";
		parent.document.getElementById("configDivTemp").innerHTML=configMenuDiv.outerHTML;
	}else{
		configMenuDiv.style.display="block";
	}
}
/*根据权限调整菜单是否显示*/
function filterMenu(){

	var pageNum = ef.get("pageNum").value;
	var portalType = ef.get("portalType").value;
	var useNodeStr = ef.get("useNode").value;
	var useNode=true;
	if(useNodeStr=="false")
		useNode=false;
	
	if ("EV03"==pageNum || "EV04"==pageNum || "personal"==portalType){
		menuNum+=3;
		ef.get("themaTr").style.display = "block";
		ef.get("layoutTr").style.display = "block";
		if(useMenu){
			menuNum+=1;
			ef.get("menuTr").style.display = "block";
		}
		ef.get("portletTr").style.display = "block";
	}
	if (!("EV03"==pageNum || "EV04"==pageNum)&&(useNode)){
		menuNum+=1;
		ef.get("nodeTr").style.display = "block";
	}
	if(menuNum==0){
		alert("当前无可配置信息");
		return 0;
	}
	document.getElementById("configMenuDiv").style.height=50+menuNum*25;
	document.getElementById("menu_contentbg").style.height=8+menuNum*25;
	document.getElementById("menu_leftbg").style.height=8+menuNum*25;
	document.getElementById("menubg").style.height=8+menuNum*25;
	document.getElementById("menu_rightbg").style.height=8+menuNum*25;	
}