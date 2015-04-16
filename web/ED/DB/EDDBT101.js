efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");

	efregion.show("ef_region_inqu");
}	

/*
  点击返回按钮
*/
button_return_onclick = function () 
{
  var grid = efgrid.getGridObject("ef_grid_result");
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("EDDBT101", grid.getSelectRowsData());	
  }
  window.close();

}



var tableTreeModel =  new eiTreeModel('EDDBTT');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){
  if(node.depth() == 1){
    node.icon(efico.get("eftree.treeImgActv"));
    node.openIcon(efico.get("eftree.treeImgInActv"));
    return;
  }
    
  if ( node.leaf() ){ 
    node.textClicked = function(){ treeNodeClicked( node ); };
    node.icon(efico.get("eftree.file"));
    node.openIcon(efico.get("eftree.file"));
    return;
  }
  
  if(node.depth() == 2) {
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
  }
  
}

function treeNodeClicked(node){
   var project = node.project;
   var table = node.key;
   
   ef.get("inqu_status-0-projectEname").value=project;
   ef.get("inqu_status-0-tableEname").value=table;
     
   efgrid.submitInqu( "ef_grid_result", "ed","EDDBT1","query" );
   
}

