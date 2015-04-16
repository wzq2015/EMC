/*
 * 从后台加载门户主页所有配置信息
 */

efform_onload = function ()
{
   var info=_getEi();
   var nodevalue = info.get("useNode");
 
   var iframe=parent.document.getElementById('mainFrame');
  
   if(nodevalue!=null && nodevalue =="false" ){
   alert("该模式下不能进行此操作!");
		 window.close();
	
	if(parent.document.location.href !=  document.location.href){
		 iframe.src="";
		 }
   }  

  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
}

var tableTreeModel =  new eiTreeModel('EVCM0507');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); }; 
 if(node.depth() == 1) {
    node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }else if(node.depth()>1){
     node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
  }  
}

function treeNodeClicked(node){
  var label = node._label;
  var info = new EiInfo();
  ef.get("inqu_status-0-parentNodeId").value=node._label;
  ef.get("inqu_status-0-authType").value="maintain";
  info.setById("inqu_status-0-parentNodeId");
  info.setById("inqu_status-0-authType");
  EiCommunicator.send( "EVCM0508", "checkAuth" , info, null ); 
  if(ajaxEi!=null){
  	var infoMsg=ajaxEi.getMsg();
  if(infoMsg!="true"){
		alert("您没有该节点下的门户维护权限！");
		return  false;
		}else{
			init_portal_portlet(label);
			}
	}
}

init_portal_portlet = function(id) {
	var info = new EiInfo();
	info.set("nodeId",id);
	EiCommunicator.send("EV04", "queryPortalInfo", info,
			onQueryPortalInfo_callback);
}

var onQueryPortalInfo_callback = {
	onSuccess : function(eiInfo) {
		var infoMsg = eiInfo.getMsg();
		if (infoMsg != "true") {
			efwindow.show(null,"selectAddNew","center");		
		}else {
			//显示portal内容
			efform.openNewForm('EV01', "methodName=initLoad&nodeId=" + eiInfo.get("nodeId")+"&pageNum=EV04");
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

//点击审核弹出框中的取消按钮
button_cancel_onclick=function(){
  efwindow.hide();
}

//点击审核弹出框中的确定按钮
button_confirm_onclick=function(){
	var nodeId = ef.get("inqu_status-0-parentNodeId").value;
	var info = new EiInfo();
	info.set("nodeId",nodeId);
	EiCommunicator.send("EV04", "addSysPortal", info, onAddSysPortal_callback);
	efwindow.hide();
}

/**
* 增加系统门户的回调函数
*/
var onAddSysPortal_callback = {
	onSuccess : function(eiInfo) {
		var infoStatus = eiInfo.getStatus();
		if (infoStatus != -1) {
			efform.openNewForm('EV01', "methodName=initLoad&nodeId=" + eiInfo.get("nodeId")+"&pageNum=EV04");
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}