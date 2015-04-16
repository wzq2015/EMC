var orgTreeModel =  new eiTreeModel('ESUTTR10');
var selectUser = "";

efform_onload = function () {
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");	
}

function configTree(tree){
	  tree.emptyNodeAsLeaf = false;
	  tree.activeEmptyJudger = false;
	  tree.topNodeActive = false;
	  tree.nodeInitializer = treeNodeInitializer;
	}

	function treeNodeInitializer(node){  
	  if ( node.top() ){ return; };
	  if ( node.data().type == "2"  ) {
	    node.icon(efico.get("efgrid.addRow"));
	    node.openIcon(efico.get("efgrid.addRow"));
	  } else if( node.data().type == "3" ){
	    node.icon(efico.get("eftree.cu"));
	  }  
	  node.textClicked = function(){ treeNodeClicked( node ); };
	}

	function treeNodeClicked(node){
	   ef.get("inqu_status-parent").value=node.label();  
	   efgrid.submitInqu( "ef_grid_orgrole", "es","ES321","queryOrgRoles");   
	}

button_query_onclick = function() {
	efgrid.submitInqu( "ef_grid_r", "es","ES321","queryUsers");
}

ajax_callback = {
	      onSuccess : function(eiInfo){ 
				var grid = efgrid.getGridObject("ef_grid_userrole");
				grid.setData(eiInfo);
				grid.refresh();
	               },
	      onFail   : function(eMsg){
	                     alert("failure");
	                  }
	    }

button_insert_onclick = function() {
//	efgrid.submitForm( "ef_grid_orgrole", "es","ES321","insert", true );
	var info = new EiInfo();
	var grid_ids = ["ef_grid_orgrole"];
	efgrid.addGridsSelectedData(grid_ids, info);
	info.set("selectUser",selectUser);
    EiCommunicator.send( "ES321", "insert" , info, ajax_callback );
}

button_delete_onclick = function() {
//	efgrid.submitForm( "ef_grid_userrole", "es","ES321","delete", true );
	var info = new EiInfo();
	var grid_ids = ["ef_grid_userrole"];
	efgrid.addGridsSelectedData(grid_ids, info);
	info.set("selectUser",selectUser);
    EiCommunicator.send( "ES321", "delete" , info, ajax_callback );
}

function efgrid_onRowClicked( grid_id, row_index )
{
    if( grid_id == "ef_grid_r" )
    {
        var grid = efgrid.getGridObject("ef_grid_r");
        selectUser = grid.getCellValue(row_index,0,TYPE_DATA);
        
        ef.get("slave_inqu_status-0-selectUser").value = selectUser;
        
        efgrid.submitInqu( "ef_grid_userrole", "es", "ES321", "queryUserRoles");
    }
}