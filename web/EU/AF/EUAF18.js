var tableTreeModel =  new eiTreeModel('EUAF03Tree');
var treeNode;

efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_all");
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
	ef.get("inqu_status-0-fileName").value="";
	ef.get("inqu_status-0-fileId").value="";
	efgrid.submitInqu( "ef_grid_result", "eu","EUAF18","query");
}
function treeNodeClicked(node){
   treeNode=node;
   var label=node._label;
	ef.get("inqu_status-0-fileName").value="" ;
	ef.get("inqu_status-0-fileId").value=label;
   queryByNode();
}

function queryByNode(){
	efgrid.submitInqu( "ef_grid_result", "eu","EUAF18","query");
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
/*以上是Tree的定义*/

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	ef.get("inqu_status-0-fileId").value="";
	efgrid.submitInqu( "ef_grid_result", "eu","EUAF18","query");
}

// 下载按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
	var grid = efgrid.getGridObject( "ef_grid_result" );
	// 取得ID
	var id = grid.getCellValue(row_index,0,"", true);
	var href = "./EU/AF/EUAF06.jsp?attachmentId="+id;
	if(col_index == 5){
		return "\<input value='下载' class='buttonClass' type='button' onclick='window.location.href=\""+href+"\"'>" ;
	}
}