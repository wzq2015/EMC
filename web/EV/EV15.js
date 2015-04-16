efform_onload = function (){
	//去掉右上角的三个小图标
	document.getElementById("iplat_helpImage_id").style.visibility="hidden";
	document.getElementById("iplat_printImage_id").style.visibility="hidden";
	document.getElementById("iplat_pageClose_id").style.visibility="hidden";
	//
	}
var tableTreeModel = new eiTreeModel("EVCM0509");

// 定义树组件
function configTree(tree) {
	tree.emptyNodeAsLeaf = false;
	tree.activeEmptyJudger = false;
	tree.topNodeActive = false;
	tree.nodeInitializer = treeNodeInitializer;
}	
//	初始化树组件
function treeNodeInitializer(node) {
	node.type(new radioItemType(false));
	node.textClicked = function() {
		treeNodeClicked(node);
	};
}
function treeNodeClicked(topNode){
}
function button_switch_onclick(){
	if(nTree.getOption()==null){
		alert("根节点不能用于指定来源");
		return false;
	}
	if(nTree.getOption()==""){
		alert("请选择节点!");
		return;
	}
	var selfAble = (nTree.getOption()).split("@")[3];
	  if(selfAble=="false"){
	     alert("没有权限，不允许访问!");
	     return ;
	  }
	window.returnValue = (nTree.getOption()).split("@")[1];
	window.close();
	//var info = new EiInfo();
	//info.set("nodeId",(nTree.getOption()).split("@")[1]);
	//EiCommunicator.send("EV01", "render", info, switch_callback);
}

var switch_callback = {
	onSuccess : function(eiInfo) {
		window.parent.location.href("DispatchAction.do?efFormEname=EV01&serviceName=EV01&methodName=initLoad&nodeId=" + eiInfo.get("nodeId"));
		//window.returnValue = eiInfo.get("nodeId");
		//window.close();
		//efform.openNewForm('EV01', "serviceName=EV01&methodName=initLoad&nodeId=" + eiInfo.get("nodeId"));
		//parent.close();
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}