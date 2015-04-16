var orgTreeModel =  new eiTreeModel('ESUTTR55');
var refreshTab0 = true;
var refreshTab1 = true;

efform_onload = function () {
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_main");
  efgrid.submitInqu( "ef_grid_r", "es","ES34","query");
  enableButtons(false);
}

button_delete_onclick = function() {
  	efgrid.submitForm( "ef_grid_r", "es","ES32","delete", true );  
}

button_insert_onclick = function() {
    var parent = nTree.getCurrent().parent();
    var parentL = "";
    if ( !parent.top() ) parentL = parent.label();
    
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT16', "inqu_status-0-parent="+parentL);
  	childW.focus();


}




button_f3_onclick = function () {	
    var parent = nTree.getCurrent().parent();
    var parentL = "";
    if ( !parent.top() ) parentL = parent.label();	
    
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT22', "inqu_status-0-org="+parentL);
  	childW.focus();
}

button_f4_onclick = function () {	
	var grid = efgrid.getGridObject("ef_grid_e");
	var rows = grid.getSelectRowsData();
	var selectPost = false;
 	for( var i=0; i<rows.length; i++ ){
		if (rows[i]["attr6"] == "2") {
			selectPost = true;
			break;
		}
	}
	if (selectPost) {
		alert(getI18nMessages("label.ESCannotDeleteRoleTypePerm","无法删除来源为[角色类型]的权限!"));
		return;
	}
    efgrid.submitForm( "ef_grid_e", "es","ESLV16","delete", true );
}


efform_onPopupReturn = function(formname,rows){
  if( formname == "ESUT16" ){
    member_onPopupReturn(rows);
  }else {
    page_onPopupReturn(rows);
  }  
}

member_onPopupReturn = function(rows){
  var callback = {
	onSuccess :
	  function(eiInfo) {	
        var grid = efgrid.getGridObject("ef_grid_r");
		grid.setData(eiInfo);
		grid.refresh();	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
	};
	
  var grid = efgrid.getGridObject( "ef_grid_r" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};
    rPost.loginName = rows[i].id;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-parent", nTree.getCurrent().data().id);  
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ES32", "insert" , eiinfo, callback );
}

page_onPopupReturn = function(rows){
  var callback = {
	onSuccess :
	  function(eiInfo) {	
        var grid = efgrid.getGridObject("ef_grid_e");
		grid.setData(eiInfo);
		grid.refresh();	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
	};
	
  var grid = efgrid.getGridObject( "ef_grid_e" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};    
    rPost.attr1 = rows[i].clazz;
    rPost.attr4 = rows[i].label;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-parent", nTree.getCurrent().data().id);  
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ESLV16", "insert" , eiinfo, callback );
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  
  if ( node.top() || node.data().type != "2"  ) {
    node.active(false);
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));    
    return;
  }
  
  node.icon(efico.get("eftree.treeImgGroup"));
  node.openIcon(efico.get("eftree.treeImgGroup"));
  
  var nodeData = node.parent().data();
  if ( nodeData.RoleMemberManage=="1" || nodeData.RolePermissionManage=="1" ){
    node.textDom().style.color = "red";
    node.textClicked = function(){ treeNodeClicked( node ); };
   }else{
     node.active(false);
   }   
}

function treeNodeClicked(node){
   enableButtons(true);   
   document.getElementById("inqu_status-parent").value=node.data().id; 
    eftab_show("ef_tab_x", 0);  
     eftab_show("ef_tab_x", 1);  
   var nodeData = node.parent().data();
   if ( nodeData.RoleMemberManage!="1" ){
     eftab_hidden("ef_tab_x", 0);
   }
   if ( nodeData.RolePermissionManage!="1" ){
    eftab_hidden("ef_tab_x", 1);
   } 
   refreshTab0 = true;
   refreshTab1 = true;
   
   var cur = eftab_current("ef_tab_x");
   if( cur == "0" ){
     efgrid.submitInqu( "ef_grid_r", "es","ES32","query");
     refreshTab0 = false;
   } else if ( cur == "1" ){
     efgrid.submitInqu( "ef_grid_e", "es","ESLV16","query");
     refreshTab1 = false;
   } 
   
}

switchTabCallback = function( from, to ){
  if( to == "0" && refreshTab0 ){
     efgrid.submitInqu( "ef_grid_r", "es","ES32","query");
     refreshTab0 = false;
   } else if ( to == "1" && refreshTab1 ){
     efgrid.submitInqu( "ef_grid_e", "es","ESLV16","query");
     refreshTab1 = false;  
   }   
  return true;
}

function enableButtons(enable){
  efbutton.setButtonStatus("INSERT", enable);
  efbutton.setButtonStatus("DELETE", enable);
  efbutton.setButtonStatus("F3", enable);
}






