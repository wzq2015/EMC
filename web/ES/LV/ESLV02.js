var orgTreeModel =  new eiTreeModel('ESUTTR50');
var refreshTab0 = true;
var refreshTab1 = true;
var refreshTab2 = true;

efform_onload = function () {
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_main"); 
  enableButtons(false);
  

}

button_f3_onclick = function () {
  var childW = efform.openNewForm('ESUT10', "chooseType=HROG&&efFormPopup=1");
  childW.focus();
  
}

reload_tree_node = function() {
    var nd = nTree.getCurrent();
  	if ( null != nd ){
  	    nd.reload();
  	}   	
}

button_f4_onclick = function () {
  efgrid.submitForm( "ef_grid_m", "es","ESLV13","delete",true );

}

button_f5_onclick = function () {
    var parent = nTree.getCurrent().parent();
    var parentL = "";
    if ( !parent.top() ) parentL = parent.label();	
    
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT21', "inqu_status-0-org="+encodeURIComponent(parentL));
  	childW.focus();
}

button_f6_onclick = function() {
  efgrid.submitForm( "ef_grid_r", "es","ESLV11","delete", true );
}

button_f7_onclick = function() {
  efgrid.submitForm( "ef_grid_p", "es","ESLV71","delete", true );
  
  //删除之后需要重新reload树节点
	eftreenode_reload(); 
}

button_f8_onclick = function() {
  	var childW = efform.openNewForm('ESUT10', "chooseType=USER&&callbackFunc=admin_onPopupReturn&&efFormPopup=1");
  	childW.focus();
}

button_f9_onclick = function() {
  efgrid.submitForm( "ef_grid_p", "es","ESLV71","update",true );
  
  eftreenode_reload();
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid )
{
  if ( grid == "ef_grid_p" ){
    if( col_index >1 ){
      var html = ""; 
      if(display_value =='1'){
        html = "<div align='center'><input hidefocus='-1' type='checkbox' checked onclick='setPerm("+row_index+ "," + col_index + ",this.checked);'/></div>";
      }else {
        html = "<div align='center'><input hidefocus='-1' type='checkbox' onclick='setPerm("+row_index+ "," + col_index + ",this.checked)'/></div>";
      }
      return html;
    }  
  }
}

setPerm = function(row_index, col_index, flag){
  var grid = efgrid.getGridObject("ef_grid_p");
  if(flag){
    grid.setCellValue(row_index, col_index, '1',TYPE_DATA);
  }else{
    grid.setCellValue(row_index, col_index, '0',TYPE_DATA);	
  }
}

eftreenode_reload = function(){
	   var nd = nTree.getCurrent();
  	   if ( null != nd ){
  	    nd.reload();
  	   }  
}

efform_onPopupReturn = function(formname,rows){
  if( formname == "ESUT10" ){
    hrog_onPopupReturn(rows);
  }else {
    page_onPopupReturn(rows);
  }  
}

admin_onPopupReturn = function(formname, rows){  
  var grid = efgrid.getGridObject( "ef_grid_p" );
  var callback = {
	onSuccess :	function(eiInfo) {	
		grid.setData(eiInfo);
		grid.refresh();	
        eftreenode_reload();		
	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
  };  
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};
    rPost.orgAdm = rows[i].id;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  var org = nTree.getCurrent().label();
  if ( !isAvailable(org) ){ org = "" }
  eiinfo.setByNameValue("inqu_status-org", org);  
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ESLV71", "insert" , eiinfo, callback );
}

page_onPopupReturn = function(rows){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var callback = {
	onSuccess :	function(eiInfo) {	
		grid.setData(eiInfo);
		grid.refresh();	
	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
  };  
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() ); 
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};
    rPost.label = rows[i].label;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  var org = nTree.getCurrent().label();
  if ( !isAvailable(org) ){ org = "" }
  eiinfo.setByNameValue("inqu_status-org", org);  
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ESLV11", "insert" , eiinfo, callback );
}

hrog_onPopupReturn = function(rows){
  var grid = efgrid.getGridObject( "ef_grid_m" );
  var callback = {
	onSuccess :	function(eiInfo) {	
		grid.setData(eiInfo);
		grid.refresh();	

	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
  };  
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() ); 
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};
    rPost.orgCode = rows[i].label;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  var org = nTree.getCurrent().label();
  if ( !isAvailable(org) ){ org = "" }
  eiinfo.setByNameValue("inqu_status-org", org);  
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ESLV13", "insert" , eiinfo, callback );
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
    return;
  };
  
  var nodeData = node.data();

  if ( nodeData.SubOrgAdminManage=="1" || nodeData.SubOrgResouceRange=="1" || nodeData.SubOrgHrogMap=="1"){    
    node.icon(efico.get("efform.dev"));
    node.openIcon(efico.get("efform.dev"));
    node.textClicked = function(){ treeNodeClicked( node ); };
   }else{
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
    node.active(false);
   }
}

function treeNodeClicked(node){
   eftab_show("ef_tab_x", 1);  
   eftab_show("ef_tab_x", 2);  
   eftab_show("ef_tab_x", 0);  
   enableButtons(true);
   var org = node.label();
   document.getElementById("inqu_status-org").value=org;  
   if ( node.data().SubOrgAdminManage!="1" ){
    eftab_hidden("ef_tab_x", 0);
   } 
   
   if ( node.data().SubOrgResouceRange!="1" ){
     eftab_hidden("ef_tab_x", 1);
   } 
   
   if ( node.data().SubOrgHrogMap!="1" ){
     eftab_hidden("ef_tab_x", 2);
   } 
   
   refreshTab0 = true;
   refreshTab1 = true;
   refreshTab2 = true;
   
   var cur = eftab_current("ef_tab_x");
   if( cur == "0" ){
     efgrid.submitInqu( "ef_grid_p", "es","ESLV71","query");
     refreshTab0 = false;
   } else if ( cur == "1" ){
     efgrid.submitInqu( "ef_grid_r", "es","ESLV11","query");
     refreshTab1 = false;  
   } else if ( cur == "2" ){
     efgrid.submitInqu( "ef_grid_m", "es","ESLV13","query");
     refreshTab2 = false;  
   }   
}

switchTabCallback = function( from, to ){
  if( to == "0" && refreshTab0 ){
     efgrid.submitInqu( "ef_grid_p", "es","ESLV71","query");
     refreshTab0 = false;
   } else if ( to == "1" && refreshTab1 ){
     efgrid.submitInqu( "ef_grid_r", "es","ESLV11","query");
     refreshTab1 = false;  
   } else if ( to == "2" && refreshTab2 ){
     efgrid.submitInqu( "ef_grid_m", "es","ESLV13","query");
     refreshTab2 = false;  
   }   
  return true;
}

function enableButtons(enable){
  efbutton.setButtonStatus("F3", enable);
  efbutton.setButtonStatus("F4", enable);
  efbutton.setButtonStatus("F5", enable);
  efbutton.setButtonStatus("F6", enable);
  efbutton.setButtonStatus("F7", enable);
  efbutton.setButtonStatus("F8", enable);
  efbutton.setButtonStatus("F9", enable);
}




