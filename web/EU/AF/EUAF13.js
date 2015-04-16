var tableTreeModel =  new eiTreeModel('EUAF13Tree');
var treeNode;
var method = "";
efform_onload = function ()
{
  var split = efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
   //split.catchEvent(window.rightFrame);
   efregion.show("ef_region_all");
   ef.get("inqu_status-0-search_data").value = "";
}
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = true;
  tree.clickableNodeNames = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}
function treeNodeInitializer(node)
{
	 if (node.top()){
	    node.active(true);
	   	node.textClicked = function(){ treeTopNodeClicked( node ); };
	   	return;
	 };
	 node.textClicked = function(){ treeNodeClicked( node ); };
}
function treeTopNodeClicked(topNode){
	treeNode=topNode;
	treeNode._label = '-1';
}
function treeNodeClicked(node){
   treeNode=node;
   document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF14&method=serach&nodeVal="+treeNode._label;
}

reloadCurrentNode = function()
{
    var no = nTree.rootNode();
  	if ( no == null ){
  	  nTree.reload(tableTreeModel);
  	} else {
	  no.reload();
	}
}

/*---------------------------以上是Tree定义*/
var method = "";
function runPro(method){
	if(treeNode == undefined){
		alert("请选择节点进行操作！");
		return ;
	}else if(method == ""){
		alert("请选择操作类型！");
		return ;
	}
	if(treeNode._label == "-1"&&method == "update"){
		alert("根节点不能编辑！");
		return ;
	}
	document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF15&method="+method+"&nodeVal="+treeNode._label+"&parentVal="+treeNode.parentId;
}
function button_addMenu_onclick(){
	runPro("insert");
}
function button_updateMenu_onclick(){
	runPro("update");
}
function button_deleteMenu_onclick(){
	if(confirm("确定删除吗？")){
		runPro("delete");
	}
}
function search(){
	var data = ef.get("inqu_status-0-search_data").value.trim();
	document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF16&titleData="+encodeURI(encodeURI(data));
}
function back(){
	ef.get("inqu_status-0-search_data").value = "";
	document.getElementById("rightFrame").src = "DispatchAction.do?efFormEname=EUAF14&method=insert";
}

