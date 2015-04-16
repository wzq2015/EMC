var isTop = false;

efform_onload = function () {
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_main");  
  efregion.show("ef_region_person");
  efbutton.setButtonStatus("F1", false);
}

button_f1_onclick = function () {
	var grid = efgrid.getGridObject( "ef_grid_p" );
	grid.setOffset(0);
	if(ef.get("topNode").value=="false")
		queryLevelResetUser();
	else
		queryAllResetUser();
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid )
{

    if ( grid == "ef_grid_p" ){
    //if( col_index == 4 ){
    if( col_index == 4 ){
      var html = ""; 
	  html = "<div align='center'><input value='" + getI18nMessages("label.ESReset","重置") +"' class='buttonClass' type='button' onclick='resetPassword(\""+grid+"\",\""+row_index+"\",\""+col_index+"\")'/></div>" ;
      return html;
    }  
  }
}

function resetPassword(grid_id ,row_index,col_index){
	var callback = {
			onSuccess :	function(eiInfo) {	
			},
			onFail : function(eMsg) {
				alert(eMsg);
			}
	}

	var grid = efgrid.getGridObject(grid_id);
	var userId = grid.getCellValue(row_index, 0, TYPE_DATA);
	var userCname = grid.getCellValue(row_index, 1, TYPE_DATA);
   var info = new EiInfo();
   info.setByNameValue("inqu_status-0-userId",userId);	
   info.setByNameValue("inqu_status-0-queryUserId",userId);
   if(confirm(getI18nMessages("label.ESConfirmResetPassword","是否确定重置该用户密码")+"[" + userId+':'+userCname + "]?")) {
	   if (isTop) {
		   //如果点击顶层节点，重置密码需要受到数据集授权限制
		   EiCommunicator.send( "ES24", "resetPassword" , info, callback );
	   } else {
   		EiCommunicator.send( "ES21", "resetPassword" , info, callback );
	   }
   }
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  if ( node.top() ){
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));  
    //if(ef.get("isAdmin").value == "true")
    node.active(true);  
    node.textClicked = function(){ 
				enableButtons();
    			ef.get("topNode").value="true";
    			queryAllResetUser();
    			}; 
    return;
  };
  
  var nodeData = node.data();
    node.icon(efico.get("efform.dev"));
    node.openIcon(efico.get("efform.dev"));
    node.textClicked = function(){ ef.get("topNode").value="false";treeNodeClicked( node ); };

}


enableButtons = function(){
   efbutton.setButtonStatus("F1", true);	
}

function treeNodeClicked(node){
   enableButtons();  
   ef.get("inqu_status-0-parent").value=node.label(); 
   queryLevelResetUser();
}



queryAllResetUser = function(){
	var grid = efgrid.getGridObject( "ef_grid_p" );
	var callback = {
			onSuccess :	function(eiInfo) {	
				
				grid.setServiceName("ES20");
				grid.setData(eiInfo);
				grid.refresh();	
				isTop = true;
			},
			onFail : function(eMsg) {
				alert(eMsg);
			}
	}
   var info = new EiInfo();
	var block = new EiBlock( grid.getBlockData().getBlockMeta() );
	info.addBlock( block );
	block.setAttr( grid.getBlockData().getAttr() );
	block.set( "orderBy", grid.getOrderBy() );
   info.setById("inqu_status-0-userId");
   info.setById("inqu_status-0-userCname");
   EiCommunicator.send( "ES20", "query" , info, callback );
}

queryLevelResetUser = function(){
	var grid = efgrid.getGridObject( "ef_grid_p" );
	var callback = {
			onSuccess :	function(eiInfo) {				
				grid.setServiceName("ESUT16");
				grid.setData(eiInfo);
				grid.refresh();	
				isTop = false;
			},
			onFail : function(eMsg) {
				alert(eMsg);
			}
	}	 
   var info = new EiInfo();
	var block = new EiBlock( grid.getBlockData().getBlockMeta() );
	info.addBlock( block );
	block.setAttr( grid.getBlockData().getAttr() );
	block.set( "orderBy", grid.getOrderBy() );
   info.setById("inqu_status-0-parent");
   info.setById("inqu_status-0-userId"); 	
   info.setById("inqu_status-0-userCname");
   EiCommunicator.send( "ESUT16", "query" , info, callback );

}


