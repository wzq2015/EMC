var appTreeModel =  new eiTreeModel('ESUTTR20');

efform_onload = function () {
//  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_frame");
  efgrid.submitInqu( "ef_grid_p", "es","ES41","query");
}

reloadCurrentNode = function()
{
    var no = nTree.getCurrent();
  	if ( no == null ){
  	  nTree.reload(appTreeModel);	 
  	} else {  	
	  no.reload();
	}  
}

button_f4_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES40","delete", true );
  	reloadCurrentNode();
}

button_f5_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES40","insert",true );	
	reloadCurrentNode();
}

button_f6_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES40","update", true );
	reloadCurrentNode();
}

button_f7_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_p", "es","ES41","delete", true );
  	reloadCurrentNode();
}

button_f8_onclick = function() 
{
	efgrid.submitForm( "ef_grid_p", "es","ES41","insert",true );	
	reloadCurrentNode();
}

button_f9_onclick = function() 
{
	efgrid.submitForm( "ef_grid_p", "es","ES41","update", true );
	reloadCurrentNode();
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  if ( node.top() ){
   	node.active(true);
    node.textClicked = function(){ treeNodeClicked( node ); };
  	return; 
  };

  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   var lb = node.label();
   if ( lb == null ){
     lb = "";
   }
   document.getElementById("inqu_status-parent").value=lb;  
   efgrid.submitInqu( "ef_grid_r", "es","ES40","query");
   efgrid.submitInqu( "ef_grid_p", "es","ES41","query");
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  if( grid_id == "ef_grid_p" && col_index == 2){
     return "\<div align='center'><a href='javascript:void(0)' onclick='showButtons("+ row_index + ","+ col_index +" )'>&nbsp;"+getI18nMessages("label.ESButtonConfig","按钮配置")+"&nbsp;</a></div>" ;		
  }  
}

showButtons = function (row_index,col_index){
  var grid = efgrid.getGridObject( "ef_grid_p" );
  var res = grid.getCellValue(row_index, 1, TYPE_FIX); 
  efform.openNewForm('ES42', "inqu_status-0-page=" + res );
}
