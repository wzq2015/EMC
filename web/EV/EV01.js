var nodeList=new Array();
var defaultNodeIds;
var separatorCharComma="#";
var separatorCharAt="@";
var defaultId='';
var defaultNodeName;
var portalId;
var newMask={
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%",
    "opacity": "30",
    "filter": "alpha(opacity=100)",
    "background-color": "#FFFFFF",
    "display":"none"
}
window.onload = function (){
//debugger;
 	var url=ef.get("url").value;
 	
    var tableDiv=ef.get("tableDiv");
    var tableFrame="";
    var pageNum = ef.get("pageNum").value;
    if(!(pageNum!=null && pageNum=="EV03")){
    	tableFrame=tableFrame+"<iframe name='table' allowtransparency='true' style='background-color:transparent' src='DispatchAction.do?efFormEname=EV0102"+url+"' scrolling='no' target='portal' width='90%'  height='30' frameborder='no' border='0' marginwidth='0' marginheight='0'/>";
    }else{
    	tableFrame=tableFrame+"<iframe name='table' allowtransparency='true' style='background-color:transparent' src='EV/ev_bank.jsp' scrolling='no' target='portal' width='60%'  height='30' frameborder='no' border='0' marginwidth='0' marginheight='0'/>";
    }
    tableDiv.innerHTML=tableFrame;
    
    var configDiv=ef.get("configDiv");
    configDiv.innerHTML="<iframe name='config' allowtransparency='true' style='background-color:transparent' src='DispatchAction.do?efFormEname=EV0103"+url+"' scrolling='no' target='portal' width='100%' height='83' frameborder='no' border='0' marginwidth='0' marginheight='30'/>";
    
    var portalDiv=ef.get("portalDiv");
     portalDiv.innerHTML="<iframe frameborder='0' src='DispatchAction.do?efFormEname=EV0105"+url+"' name='portal' scrolling='yes' width='100%' height='1000'/>";
 
    if(useMenu){
    	portalId = ef.get("portalId").value;
    	document.getElementById("menuArea").innerHTML="<div id='nMenu'/>";
    	genMenuTree(portalId); 
    }
    
    
     modalWin=new EFModalWindow('progressWindow');
    $(modalWin.popupMask).removeClass("efModalWindowMask");
    $(modalWin.popupMask).css(newMask);
    $(modalWin.popupMask).focus(function(){hideMask();$("div[popdiv='true']").hide()});
  
   
}
function show_click(){
	alert('aaaa');
}
function windowMask(){
	modalWin.show(30, 30);
  
	
}
function hideMask(){
  modalWin.hide();
}
button_updateNode_cancel=function(){
	var objDiv = document.getElementById("nodeDiv");
	objDiv.style.display="none";
}

button_updateNode_onclick = function(){
	if(nodeList.toString()==''){
		alert('请选择节点树');
		return;
	}
	/**这里只更新默认节点，选中的节点返回调用页面;后续可以在EV16直接处理*/
	synUpdateDefaultNodeId();
}

synUpdateDefaultNodeId = function(){
	var ei_info = new EiInfo();
	ei_info.set( "defaultNodeId", ef.get("defaultNodeId").value );
	ei_info.set( "nodeList", nodeList.toString() );
	EiCommunicator.send( "EV16", "updateDefaultNodeId" , ei_info,callback);
}

//	回调函数
var callback = {
	onSuccess : function(eiInfo) {
		alert("设置成功!");
		//隐藏div
		var objDiv = document.getElementById("nodeDiv");
		objDiv.style.display="none";
		//刷新当前页
		window.location.reload();
		
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

var nodeTreeModel =  new eiTreeModel('EVCM0509');

function configTree1(tree){
	tree.nodeInitializer = treeNodeInitializer1;
}

function treeNodeInitializer1(node) {
	node.textDom().style.color = "black";
	if (node.depth() > 0) {
		node.type( new checkItemType(false) );
	}
	if (node.depth() < 1) {
		node._opened = true;
	}
	node.icon("EF/Images/eftree_cu.gif");
	node.openIcon("EF/Images/eftree_cu.gif");
	//查询当前选中节点
	var info = new EiInfo();
	info.set("portalId",portalId);
	info.set("random",Math.random());
	EiCommunicator.send("EV16", "initLoad", info,node_callback);		
}

var node_callback = {
	onSuccess : function(info) {
		var objDiv = document.getElementById("nodeDiv");
		objDiv.style.position="absolute";
		objDiv.style.width="450px";
		objDiv.style.height="50px";
		objDiv.style.top="20%";
		objDiv.style.left="30%";
		objDiv.style.background="#8bc2df";
		objDiv.onblur=button_updateNode_cancel;
		
		
		var nodeIds = info.get("nodeIds");
		var nodeNames = info.get("nodeNames"); 
		defaultId = info.get("defaultId"); 
		defaultNodeIds = nodeIds.split(",");
		defaultNodeNames=nodeNames.split(",");
		
		for(var i =0; i< defaultNodeIds.length; i++){
			if(defaultNodeNames[i] != null && defaultNodeNames[i] != "")
     			selectedNode(true,defaultNodeNames[i]+separatorCharComma+defaultNodeIds[i]);
     	}
     	var scriptss=createHtmlSelect(nodeList);
		setDefaultNodeId(tree._rootNode);
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

setDefaultNodeId = function(treeNode){
	for (var i = 0; i < treeNode._childNodes.length; i++) {
	    var node = treeNode._childNodes[i];
	    var nodeType = node._type;
		    if ( nodeType instanceof checkItemType )
		    {
		    	var text=(node._label).split(separatorCharAt)[4];
	 			var value=(node._label).split(separatorCharAt)[1];
		    	if(arrayIsExitNodeIds(getDefaultNodeIds(),value)){
		    		nodeType.checkItem(true);
		    	}
		    }
  	}
}

getDefaultNodeIds = function(){
	return this.defaultNodeIds;
}

createHtmlSelect = function(style){
		var _o = document.getElementById('defaultNodeId');
		var ops=_o.options;  
		try{
			if(style){
				for (var i = ops.length; i >= 0; i--) {
					ops.remove(ops[i]);
				}
				for(i=0;i<style.length;i++){
					var _oOption = document.createElement('OPTION');
				    _o.options.add(_oOption);
				    var text=style[i].split(separatorCharComma)[0];
				    var value=style[i].split(separatorCharComma)[1];
				    if(text) _oOption.innerText = text;
					if(value) _oOption.value = value;
					if(value==defaultId){
						_oOption.selected = defaultId;
					}
				}
			}
			
		}catch(e){
		}	
		return _o;
}

checkItemType.prototype.checkboxClicked = function(bChecked){
     var scriptss=createHtmlSelect(nodeList);
}

EFTreeNode.prototype.expand = function() {  
  this._needRender = this._opened?false:true;
  this._opened = true;
  this.load();
  this.render();
  var children = this.getChildNodes();
  for(var i=0;i<children.length;i++){
  	var node = children[i];
  	var nodeType = node._type;
    if ( nodeType instanceof checkItemType ){
    	var text=(node._label).split(separatorCharAt)[4];
		var value=(node._label).split(separatorCharAt)[1];
	   	if(arrayIsExitNodeIds(getDefaultNodeIds(),value)){
	   		nodeType.checkItem(true);
	   	}
	}
  }
  
}

checkItemType.prototype.checkDom = function (bChecked) {
     this.checked = bChecked;
     var text=(this.item._label).split(separatorCharAt)[4];
	 var value=(this.item._label).split(separatorCharAt)[1]; 
	 var selfAble = (this.item._label).split(separatorCharAt)[3];
	 if(bChecked && selfAble=="false"){
	     alert("没有权限，不允许设置!");
	     this.checked = false;
		 this._jqDom.attr("checked", this.checked);
	     return ;
	  }
     selectedNode(bChecked,text+separatorCharComma+value);
	// this._jqDom.attr("checked", this.checked);
}

selectedNode = function (bChecked,nodeId) {
	if(!bChecked){
		arrayRemove(nodeList,nodeId);
		return;
	}
	arrayPush(nodeId);
}
arrayRemove = function(nodeList,key){
	for(var i=0;i<nodeList.length;i++){
		if(nodeList[i]==key){
			nodeList.splice(i,1);
		}
	}
}
arrayPush = function(key){
	if(!arrayIsExitNodeIds(nodeList,key)){
		nodeList.push(key);
	}
}

arrayIsExitNodeIds = function(array,value){
	for( var i = 0; i < array.length; i++ )
        {
            if( array[i]==value )
            {
                return true;
            }            
        }
     return false;
}
//=============================================主题==============================================================
function setThema() {
	var configMenuDiv = document.getElementById("configMenuDiv");
	if(configMenuDiv!=null){
		configMenuDiv.style.display="none";
		hideMask();
	}
	
	var objDiv = document.getElementById("themaDiv");
	if(objDiv!=null){
		//已有div的情况下，移除div
		$(objDiv).remove();
	}else{
		var info = new EiInfo();
		info.set("portalId",ef.get("portalId").value);
		info.set("random",Math.random());
		EiCommunicator.send("EV10", "initLoad", info,thema_callback);
	}
	
}

var thema_callback = {
	onSuccess : function(info) {
        windowMask();
		
		var objDiv = document.createElement("div");
		objDiv.setAttribute("id","themaDiv");
		$(objDiv).attr('popdiv','true');
		//样式
		objDiv.style.position="absolute";
		objDiv.style.width="400px";
		objDiv.style.height="223px";
		objDiv.style.top="20%";
		objDiv.style.left="30%";
		objDiv.align='center';
		objDiv.style.z_index='600';
		
		var head =$("<div style='width:420px' class='window_topdiv'><div class='window_topleft'></div><div class='window_topbg' style='width:400px'></div><div class='window_topright'></div></div>");
		$(objDiv).append(head);
		var content=$("<div style='width:420px;height:223px' class='window_contentbox'><div class='window_leftbg' style='height:223px'></div><div  class='window_contentbg' style='width:400px;height:223px'><div id='themaContent'></div></div><div  class='window_rightbg' style='height:223px'></div></div>");
		$(objDiv).append(content);
		var bottom=$("<div style='width:420px' class='window_bottom'><div  class='window_bottomleft'></div><div  class='window_bottombg' style='width:400px'></div><div class='window_bottomright'></div></div>");
		$(objDiv).append(bottom);
		
		document.body.appendChild(objDiv);
		
		themaId = info.get("themaId");
		var html="<iframe id='picture' src='DispatchAction.do?efFormEname=EVCM0705&themaId="+themaId+"' width='400' height='223'/>";
		document.getElementById("themaContent").innerHTML=html;
	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
}


//	点击取消按钮触发函数
button_updateThema_cancel=function(){
	var objDiv = parent.document.getElementById("themaDiv");
	$(objDiv).remove();
}

//	点击保存按钮触发函数
button_updateThema_onclick = function() {
	var themaId = null;
	var thema = parent.document.getElementsByName("thema");

	for ( var i = 0; i < thema.length; i++) {
		if (thema[i].checked) {
			themaId = thema[i].id;
			break;
		}
	}

	if (themaId != null && themaId.trim() != "") {
		var inInfo = new EiInfo();
		inInfo.set("themaId", themaId);
		inInfo.set("portalId", document.getElementById("portalId").value);
		EiCommunicator.send("EV10", "save", inInfo, tp_callback);
	} else {
		alert("请选择模板!");
	}
}

//	回调函数
var tp_callback = {
	onSuccess : function(eiInfo) {
		alert("修改成功!");
		//取消配置div
		var objDiv = parent.document.getElementById("themaDiv");
		$(objDiv).remove();
		//刷新模板
		if (portal != null) {
		portal.src = "DispatchAction.do?efFormEname=EV0105&portalId="
				+ ef.get("portalId").value + "&pageNum="
				+ ef.get("pageNum").value;
			}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

//=============================================布局==============================================================
function setLayout() {
	var configMenuDiv = document.getElementById("configMenuDiv");
	if(configMenuDiv!=null){
		configMenuDiv.style.display="none";
		hideMask();
	}
	
	var objDiv = document.getElementById("layoutDiv");
	if(objDiv!=null){
		//已有div的情况下，移除div
		$(objDiv).remove();
	}else{
		
		var info = new EiInfo();
		info.set("portalId",ef.get("portalId").value);
		info.set("random",Math.random());
		EiCommunicator.send("EV11", "initLoad", info,layout_callback);		
	}

}


var layout_callback = {
	onSuccess : function(info) {
         windowMask();
		
		var objDiv = document.createElement("div");
		objDiv.setAttribute("id","layoutDiv");
		$(objDiv).attr('popdiv','true');
		//样式
		objDiv.style.position="absolute";
		objDiv.style.width="400px";
		objDiv.style.height="223px";
		objDiv.style.top="20%";
		objDiv.style.left="30%";
		objDiv.align='center';
		objDiv.style.z_index='600';
		
		var head =$("<div style='width:420px' class='window_topdiv'><div class='window_topleft'></div><div class='window_topbg' style='width:400px'></div><div class='window_topright'></div></div>");
		$(objDiv).append(head);
		var content=$("<div style='width:420px;height:223px' class='window_contentbox'><div class='window_leftbg' style='height:223px'></div><div  class='window_contentbg' style='width:400px;height:223px'><div id='layoutContent'></div></div><div  class='window_rightbg' style='height:223px'></div></div>");
		$(objDiv).append(content);
		var bottom=$("<div style='width:420px' class='window_bottom'><div  class='window_bottomleft'></div><div  class='window_bottombg' style='width:400px'></div><div class='window_bottomright'></div></div>");
		$(objDiv).append(bottom);
		
		document.body.appendChild(objDiv);
		
		layoutId = info.get("layoutId");
		var html="<iframe id='picture' src='DispatchAction.do?efFormEname=EVCM0704&layoutId="+layoutId+"' width='400' height='223'/>";
		document.getElementById("layoutContent").innerHTML=html;
	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
}


//	点击取消按钮触发函数
button_updateLayout_cancel=function(){
	var objDiv = parent.document.getElementById("layoutDiv");
	$(objDiv).remove();
}

//	点击保存按钮触发函数
button_updateLayout_onclick = function() {
	var layoutId = null;
	var layout = parent.document.frames["picture"].document.getElementsByName("realLayout");

	for ( var i = 0; i < layout.length; i++) {
		if (layout[i].checked) {
			layoutId = layout[i].id;
			break;
		}
	}
	if (layoutId != null && layoutId.trim() != "") {
		var inInfo = new EiInfo();
		inInfo.set("personalTemplateLayout", layoutId);
		inInfo.set("portalId", document.getElementById("portalId").value);
		EiCommunicator.send("EV11", "save", inInfo, lo_callback);
	} else {
		alert("请选择布局!");
	}
}

//	回调函数
var lo_callback = {
	onSuccess : function(eiInfo) {
		alert("修改成功!");
		//取消配置div
		var objDiv = parent.document.getElementById("layoutDiv");
		$(objDiv).remove();
		//刷新
		if (portal != null) {
		portal.src = "DispatchAction.do?efFormEname=EV0105&portalId="
				+ ef.get("portalId").value + "&pageNum="
				+ ef.get("pageNum").value;
			}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}
//=============================================菜单==============================================================
function setMenu() {
	var contextPath=document.getElementById("contextPath").value;
	var win = window;
	
	win.showModalDialog(contextPath + "/DispatchAction.do?efFormEname=EV14&portalId="
					+ ef.get("portalId").value + "&sourceType=EV01"
					+ "&random=" + Math.random(), "选择菜单",
			"dialogWidth=800px;dialogHeight=500px");
	genMenuTree(ef.get("portalId").value);// 调用父页面的方法菜单刷新
}
//=============================================portlet==============================================================
function setPortlet() {
	var configMenuDiv = document.getElementById("configMenuDiv");
	if(configMenuDiv!=null){
		configMenuDiv.style.display="none";
		hideMask();
	}
	
	var objDiv = document.getElementById("portletDiv");
	if(objDiv!=null){
		//已有div的情况下，移除div
		$(objDiv).remove();
	}else{
		//新建div
		var win = window;
		if (window.top) {
			win = window.top;
		}
		
		windowMask();
		var objDiv = document.createElement("div");
		objDiv.setAttribute("id","portletDiv");
		$(objDiv).attr('popdiv','true');
		//样式
		objDiv.style.position="absolute";
		objDiv.style.width="450px";
		objDiv.style.height="470px";
		objDiv.style.top="10%";
		objDiv.style.left="30%";
		objDiv.align='center';
		objDiv.style.z_index='600';
	
		var head =$("<div style='width:470px' class='window_topdiv'><div class='window_topleft'></div><div class='window_topbg' style='width:450px'></div><div class='window_topright'></div></div>");
		$(objDiv).append(head);
		var content=$("<div style='width:470px;height:470px' class='window_contentbox'><div class='window_leftbg' style='height:470px'></div><div  class='window_contentbg' style='width:450px;height:470px'><div id='portletContent'></div></div><div  class='window_rightbg' style='height:470px'></div></div>");
		$(objDiv).append(content);
		var bottom=$("<div style='width:470px' class='window_bottom'><div  class='window_bottomleft'></div><div  class='window_bottombg' style='width:450px'></div><div class='window_bottomright'></div></div>");
		$(objDiv).append(bottom);
	
		document.body.appendChild(objDiv);
	
		var contextPath=document.getElementById("contextPath").value;
		var themaPath=document.getElementById("themaPath").value;
		var html="<iframe id='picture' src='DispatchAction.do?efFormEname=EV12&portalId="+ef.get("portalId").value+"&themaPath="+themaPath+" ' width='450' height='470'/>";
		document.getElementById("portletContent").innerHTML=html;
	}
}
//=============================================节点==============================================================
function setNode() {
	var configMenuDiv = document.getElementById("configMenuDiv");
	if(configMenuDiv!=null){
		configMenuDiv.style.display="none";
		hideMask();
	}
	
	var objDiv = document.getElementById("nodeDiv");
	if(objDiv!=null){
		//已有div的情况下，移除div
		$(objDiv).remove();
	}else{
		//新建div
		windowMask();
		var objDiv = document.createElement("div");
		objDiv.setAttribute("id","nodeDiv");
		$(objDiv).attr('popdiv','true');
		//样式
		objDiv.style.position="absolute";
		objDiv.style.width="400px";
		objDiv.style.height="280px";
		objDiv.style.top="20%";
		objDiv.style.left="30%";
		objDiv.align='center';
		objDiv.style.z_index='600';
	
		var head =$("<div style='width:420px' class='window_topdiv'><div class='window_topleft'></div><div class='window_topbg' style='width:400px'></div><div class='window_topright'></div></div>");
		$(objDiv).append(head);
		var content=$("<div style='width:420px;height:280px' class='window_contentbox'><div class='window_leftbg' style='height:280px'></div><div  class='window_contentbg' style='width:400px;height:280px'><div id='nodeContent'></div></div><div  class='window_rightbg' style='height:280px'></div></div>");
		$(objDiv).append(content);
		var bottom=$("<div style='width:420px' class='window_bottom'><div  class='window_bottomleft'></div><div  class='window_bottombg' style='width:400px'></div><div class='window_bottomright'></div></div>");
		$(objDiv).append(bottom);
	
		document.body.appendChild(objDiv);
	
		var contextPath=document.getElementById("contextPath").value;
		var themaPath=document.getElementById("themaPath").value;
		var html="<iframe id='picture' src='DispatchAction.do?efFormEname=EV16&portalId="+ef.get("portalId").value+"&themaPath="+themaPath+" ' width='400' height='280'/>";
		document.getElementById("nodeContent").innerHTML=html;
	}
}

//=============================================显示配置按钮==============================================================
function showConfig() {
	if (showconfig) {
		document.getElementById("optionbar").style.display = "none";
		showconfig = false;
	} else
	{
		document.getElementById("optionbar").style.display = "block";
		showconfig = true;
	}

}
//=================================================================公共=================================================================

function closeDiv(nodeId){
	var objDiv = document.getElementById(nodeId);
	$(objDiv).remove();
	hideMask();
}