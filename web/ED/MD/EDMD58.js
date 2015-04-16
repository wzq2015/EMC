var tableTreeModel =  new eiTreeModel('EDMD58Tree');
var treeNode;

efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
}
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
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
	ef.get("inqu_status-0-objType").value="";
	ef.get("inqu_status-0-id").value="";
	efgrid.submitInqu( "ef_grid_result", "ed","EDMD58","query");
}
function treeNodeClicked(node){
   treeNode=node;
   var label=node._label;
   if(node.key == "0"){
	   ef.get("inqu_status-0-objType").value=label;
	   ef.get("inqu_status-0-id").value="";
   }else{
	   var array = node._label.split("_");
	   ef.get("inqu_status-0-objType").value=array[0];
	   ef.get("inqu_status-0-id").value=array[1];
   }
   queryByNode();
}

function queryByNode(){
	efgrid.submitInqu( "ef_grid_result", "ed","EDMD58","query");
}

reloadCurrentNode = function()
{
    var no = nTree.getCurrent();
  	if ( no == null ){
  	  nTree.reload(tableTreeModel);
  	} else {
	  no.reload();
	}
}
var childnode_insert = function (id, label) {

};

/*---------------------------以上是Tree定义*/
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () {
   ef.get("inqu_status-0-id").value= "";
   efgrid.submitInqu( "ef_grid_result", "ed","EDMD58","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
	if(validateSel()){
		if(window.confirm("确定要删除么？")){
		  	efgrid.submitForm( "ef_grid_result", "ED","EDMD58","delete", true,false,true );
		  	reloadCurrentNode();
  		}
	}else{
		alert('请先选择数据！');
	}
}
/*
  点击 新增 按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	if(validateSel()){
      	var grid = efgrid.getGridObject("ef_grid_result");
		efgrid.submitForm( "ef_grid_result", "ED","EDMD58","insertCheckCode",true );
		reloadCurrentNode();
	}else{
		alert('请先选择数据！');
	}
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	if(validateSel()){
	    var grid = efgrid.getGridObject("ef_grid_result");
		efgrid.submitForm( "ef_grid_result", "ed","EDMD58","update",true );
//		reloadCurrentNode();
		nTree.reload(tableTreeModel);
	}else{
		alert('请先选择数据！');
	}
}
//验证是否新增加了行
function validateSel(){
	var grid = efgrid.getGridObject("ef_grid_result");
  	var rows = grid.getCheckedRows();
  	if(rows == ''){
  		return false;
  	}
  	return true;
}


