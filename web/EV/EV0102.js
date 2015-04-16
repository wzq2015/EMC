var info;
var id;
var leftWidth;
var tabLength=9;
var leftNo;
var totalLength;
var _dispalyWidth = 700;
window.onload = function (){
	onloadEV();
	info=_getEi();
	var nodeId = ef.get("nodeId").value;
	var portalId = ef.get("portalId").value;
	var portalType = "";
	if(ef.get("portalType")!=null){
		portalType = ef.get("portalType").value;
	}
	highlight(nodeId,portalId,portalType);
	
	if(portalType=="personal"){
			id = nodeId+"_per_"+portalId;
		}else{
			id = nodeId+"_sys_"+portalId;
		}
	
   initTab();
   
	totalLength=$("#main_nav").find("li").length;
	leftNo=$("#"+id).prevAll("li").length;
	
	setTabSite(id);	
}
function initTab(){
	var left=$("#tab_show").find("li:last").offset().left;
	var width=$("#tab_show").find("li:last").width();
	var leftEdge=parseInt(left)+parseInt(width);
	if(leftEdge>_dispalyWidth){
		$("#leftScroll").addClass("ev_scroll-left");
		$("#rightScroll").addClass("ev_scroll-right");
		$("#leftScroll").click(function(){
	      scrollTab(true);
	   });
	   $("#rightScroll").click(function(){
	      scrollTab(false);
	   });
	   
	}
}
 function  scrollTab(flag){
 	   var  tab=$("#tab_show");
		var displayWidth=Number(tab.css('left').replace('px',''));
		!displayWidth?displayWidth=0:null;

		var DW=0;
		var left=0;
		if(flag&&displayWidth==0){
			return;
		}

		if(flag){
			left=displayWidth+parseInt(tab.find('li').eq(leftNo).width());

			left>0?left=0:null;
			tab.animate({'left':left},'normal');

		}
		//向右边移动一个tab
		else{
			//判断当前显示得li得宽度
			var _divRight = tab.find('li:last').offset().left+tab.find('li:last').width();
			
			var _offsetLeft = tab.find('li').eq(leftNo).offset().left;
			var _liWidth =tab.find('li').eq(leftNo).width();
			var _deviant = (_divRight-_liWidth)>= _dispalyWidth? _liWidth:_divRight - _dispalyWidth;
			left=displayWidth-_deviant;
			tab.animate({'left':left},'normal');
		}
		
	}
function rightScroll(){
	var rightSibings=$("#"+id).nextAll("li");
	var rightLength=rightSibings.length;
	if(rightLength>tabLength){
		
	}
}
function leftScoll(){
	if(leftNo>0){
		var temp=leftNo-1;
	    var moveWidth=parseInt($("#main_nav").find("li").eq(temp).width())+3+20; 	
	    $("#tab_show").animate({'left':leftWidth+moveWidth});
	 }
}
function setTabSite(id){
	var left=$("#"+id).offset().left;
	var leftWidth=$("#"+id).width();

	if(left+leftWidth>_dispalyWidth){
		var corLeft=_dispalyWidth-leftWidth-left;
	    $("#tab_show").animate({'left':corLeft});
	}
}

function checkShow(){
	var  tab=$("#tab_show");
	var _divRight = parseInt(tab.find('li:last').offset().left)+parseInt(tab.find('li:last').width())+80;
	var _liWidth =parseInt(tab.find('li').eq(leftNo).width());

	if(_divRight-_liWidth<_dispalyWidth){
		$(".ev_scroll-right").hide();
	}else{
		$(".ev_scroll-right").show();
	}
	if(leftNo>0)
	  $(".ev_scroll-left").show();
	 else
	   $(".ev_scroll-left").hide();
}


//重置
var reset = function() {
	if(window.confirm('你是否要重置本节点的系统门户为系统默认门户？')){
		var nodeId = ef.get("nodeId").value;
		var portalId = ef.get("portalId").value;
		if(nodeId){
			var info = new EiInfo();
			info.set("portalId",portalId);
			info.set("nodeId",nodeId);
			EiCommunicator.send("EV01", "resetPortal", info, reset_callback);
			
		}
	}
}

//重置回调函数
reset_callback={
	onSuccess : function(eiInfo) {
		var infoStatus = eiInfo.getStatus();
		if (infoStatus != -1) {
			var portalId = eiInfo.get("portalId");
			var themaPath = ef.get("themaPath").value
			var pageNum = ef.get("pageNum").value;
			//刷新菜单区和portal显示区
			if(table!=null){
				table.src="DispatchAction.do?efFormEname=EV0102&portalId="+portalId+"&themaPath="+themaPath+"&pageNum="+"EV04";
			}
			
			if(portal!=null){
				portal.src="DispatchAction.do?efFormEname=EV0105&portalId="+portalId+"&pageNum="+pageNum+"&themaPath="+themaPath;
			}
			if(config!=null){
				config.src="DispatchAction.do?efFormEname=EV0103&portalId="+portalId+"&pageNum="+pageNum+"&themaPath="+themaPath;
			}
			var parentObj = document.parentWindow.parent.genMenuTree;
			if(parentObj!=undefined){
				document.parentWindow.parent.genMenuTree(portalId);//调用父页面的方法菜单刷新
				}
			}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}



//增加个人门户
var addPersonalPortal = function(nodeId,portalId,e) {

	if(window.confirm('你确定要添加该个人门户吗？')){
		if(nodeId){
				var info = new EiInfo();
				info.set("nodeId",nodeId);
				//info.set("useNode",useNode);
				EiCommunicator.send("EV0105", "addPersonalPortal", info, addPersonalPortal_callback);
				stopBubble(e);
				
		}
	}
}

function stopBubble(e){
  //一般用在鼠标或键盘事件上
  if(e && e.stopPropagation){
  //W3C取消冒泡事件
  e.stopPropagation();
  }else{
  //IE取消冒泡事件
  	window.event.cancelBubble=true;
  
  }
  };



//增加个人门户回调函数
addPersonalPortal_callback={
	onSuccess : function(eiInfo) {
		var infoStatus = eiInfo.getStatus();
		if (infoStatus != -1) {
			var portalId = eiInfo.get("portalId");
			refresh(portalId);
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}


//删除个人门户
var deletePersonalPortal = function(nodeId,portalId,e) {
	if(window.confirm('你确定要删除"个人"标签页及其内容吗？')){
		if(nodeId){
				var info = new EiInfo();
				info.set("portalId",portalId);
				info.set("nodeId",nodeId);
				EiCommunicator.send("EV01", "deletePersonalPortal", info, null);
				parent.location.reload();
				stopBubble(e);
		}		
	}
}

//当点击tab时
function diversionPortlet(portalId,nodeName,type){
	var cu_portalId = parent.document.getElementById("portalId");
	if(cu_portalId.value!=portalId){
		refresh(portalId);
	}
	else{
	if(type=="per")
	{
		getpermouse(nodeName,portalId);
	}
	else if(type=="sys"){
		getsysmouse(nodeName,portalId);
	}
	}
	
	//refresh(portalId);
}

//刷新
function refresh(portalId){
    var themaPath = ef.get("themaPath").value
    var useNodeV = ef.get("useNode").value;
	if(table!=null){
		table.src="DispatchAction.do?efFormEname=EV0102&portalId="+portalId+"&themaPath="+themaPath+"&useNode="+useNodeV;
	}
	
	if(config!=null){
		config.src="DispatchAction.do?efFormEname=EV0103&portalId="+portalId+"&pageNum="+ef.get("pageNum").value+"&themaPath="+themaPath+"&useNode="+useNodeV;
	}
	
	if(portal!=null){
		portal.src="DispatchAction.do?efFormEname=EV0105&portalId="+portalId+"&pageNum="+ef.get("pageNum").value+"&themaPath="+themaPath+"&useNode="+useNodeV;
	}
	//调用父页面的方法菜单刷新
	var parentObj = document.parentWindow.parent.genMenuTree;
	if(parentObj!=undefined){
		document.parentWindow.parent.genMenuTree(portalId);
	}
	
	//去掉之前append在父页面的配置div
	var configMenuDiv = parent.document.getElementById("configMenuDiv");
	if(configMenuDiv!=null){
		$(configMenuDiv).remove();
	}
	//更新父页面的portalId的值
	var p_portalId = parent.document.getElementById("portalId");
	
	if(p_portalId!=null){
		p_portalId.value=portalId;
	}
	
}



/**
tab页高亮显示
*/
function highlight(nodeId,portalId,portalType){
	var pageNum = ef.get("pageNum");
	if(pageNum!=null && pageNum.value=="EV04"){
		id="reset";
	}else{
			var objs = document.getElementsByTagName("td");
			for(var i=0;i<objs.length;i++){
				objs[i].style.filter="";
			}
			if(portalType=="personal"){
				id = nodeId+"_per_"+portalId;
			}else{
				id = nodeId+"_sys_"+portalId;
			}
	}
	document.getElementById(id).className="on";
	
}
/*变成手型*/
function changeShape(obj){
	obj.style.cursor="hand";
}

function changeStyle(obj){
	//不是当前已经选中的tab时才去修改样式
	if(document.getElementById(id)!=obj)
	obj.className="hover";
}

function recover(obj){
	if(document.getElementById(id)!=obj)
	obj.className=null;
}


function getpermouse(nodeName,portalId){


	var mInput=document.getElementById('pervalue_'+portalId+'');

	mInput.innerHTML="<input  id='pernodeName' value='"+nodeName+"' onblur='saveBlurper();'/>";
	$("#pernodeName").bind("click",function(event){
	           event.stopPropagation();
	})
}

function getsysmouse(nodeName,portalId){


	var mInput=document.getElementById('sysvalue_'+portalId+'');

	mInput.innerHTML="<input  id='sysnodeName' value='"+nodeName+"' onblur='saveBlursys();'/>";
	$("#sysnodeName").bind("click",function(event){
	           event.stopPropagation();
	})
}

function saveBlurper(){

var savenodeName=document.getElementById('pernodeName').value;
var saveportalId = parent.document.getElementById("portalId").value;

		var inInfo = new EiInfo();
		inInfo.set("savenodeName", savenodeName);
		inInfo.set("saveportalId", saveportalId);
		if(savenodeName.replace(/[^\x00-\xff]/g,"aa").length>100){
			alert("节点名称不能超过100个字符！");
			return;
		}
	
		EiCommunicator.send("EV0102", "updateNodeName", inInfo,callback);
}

function saveBlursys(){

var savenodeName=document.getElementById('sysnodeName').value;
var saveportalId = parent.document.getElementById("portalId").value;


		var inInfo = new EiInfo();
		inInfo.set("savenodeName", savenodeName);
		inInfo.set("saveportalId", saveportalId);
		inInfo.set("type","sys");
		EiCommunicator.send("EV0102", "updateNodeName", inInfo,callback);
}

var callback = {

	onSuccess : function(eiInfo) {

		var infoStatus = eiInfo.getStatus();
		if (infoStatus != -1) {
			var portalId = eiInfo.get("saveportalId");
			var themaPath = ef.get("themaPath").value
		    var useNodeV = ef.get("useNode").value;
			var type = eiInfo.get("type");
			var pageNum;
			if(type =="sys" ){
			pageNum ="EV04";
			}
			
			if(table!=null){
				table.src="DispatchAction.do?efFormEname=EV0102&portalId="+portalId+"&themaPath="+themaPath+"&useNode="+useNodeV+"&pageNum="+pageNum;
			}

			}
	},
	onFail : function(eMsg) {
		alert("failure");
	}

}
