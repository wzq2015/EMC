var orgTreeModel =  new eiTreeModel('ESUTTR10');

efform_onload = function () {
  efregion.show("ef_region_result");	
  var ef_region_buttonbar = new efbuttonbar();
  ef_region_buttonbar.paint("ef_region_result");
  
  nTree.setCurrent(nTree.rootNode());
}

reloadTree = function(node)
{
	 nTree.setCurrent(nTree.rootNode());
	 reloadCurrentNode();
	 nTree.expandNode(node);
}
reloadCurrentNode = function()
{
    var no = nTree.getCurrent();
  	if ( no == null ){
  	  nTree.reload(orgTreeModel);	 
  	} else {  	
	  no.reload();
	}
}

button_f2_onclick = function() 
{
	efgrid.submitInqu( "ef_grid_r", "es","ES30","query");
}

button_f4_onclick = function() 
{
  if(confirm(getI18nMessages("es.DeleteOrgPrompt","确定要删除该组织机构吗？"))){
  	efgrid.submitForm( "ef_grid_r", "es","ES30","delete", true );
  	reloadCurrentNode();
  }	
}

button_f5_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES30","insert",true );	
	reloadCurrentNode();
}

button_f6_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES30","update", true );
	reloadCurrentNode();
}

//modify move org
button_f7_onclick = function()
{
	
	    var grid = efgrid.getGridObject( "ef_grid_r" );
	    var rows = grid.getCheckedRows();
	    if(rows.length <= 0)
	    	alert("选择要移动的组织机构");
	    else
	    {
	    	win = efform.openNewForm("ES301", "efFormPopup=1");
	    	win.focus();
	    }
	    
}

efform_onPopupReturn = function(formEname, value)
{
	var callback = {
			onSuccess :
			  function(eiInfo) {
				
				if(eiInfo.getStatus() == 1){
				 var org = eiInfo.getBlock("result").extAttr["orgParent"];
				 document.getElementById("inqu_status-parent").value=org;  
				 efgrid.submitInqu( "ef_grid_r", "es","ES30","query");
				 reloadTree(org);
				}else{
					
				}
			  },
			onFail : 
			  function(eMsg) {
				alert(eMsg);
			  }
	};
	
    var org = "";
    if ( !value.top() ){ org = value.label() }
	var grid = efgrid.getGridObject( "ef_grid_r" );
	var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
	var eiinfo = new EiInfo();
	blockA.extAttr["orgParent"] = org;
	var list = grid.getSelectRowsData();
	for(var k = 0 ; k < list.length; k++) 
	{
		 blockA.addRow(blockA.getMappedArray(list[k]));
	}
	
	eiinfo.addBlock(blockA); 
	//construct
	
	
	EiCommunicator.send("ES30","moveOrg",eiinfo,callback);
}
efgrid_onRowCellClick = function( grid_id, row_index, col_index, value )
{
	alert("in");
	if( grid_id == "ef_grid_r" )
	{
       ef.get("org_inqu_code-0-orgCode").value = value;
       alert("your Check:"+value);
	}
}
//end modify
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  if ( node.top() ){ 
    node.active(true);
    node.textClicked = function(){ treeNodeClicked( node ); };
    return;
  };
  if ( node.data().type == "2"  ) {
    node.icon(efico.get("efgrid.addRow"));
    node.openIcon(efico.get("efgrid.addRow"));
  } else if( node.data().type == "3" ){
    node.icon(efico.get("eftree.cu"));
  }  
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   var org = "";
   if ( !node.top() ){ org = node.label() }
   document.getElementById("inqu_status-parent").value=org;  
   efgrid.submitInqu( "ef_grid_r", "es","ES30","query");
}

/*
efgrid_onAddNewRow = function( grid_id )
{
  if(grid_id == "ef_grid_r" )
  {
  	var grid = efgrid.getGridObject(grid_id); 	
	var fKeyColumn = grid.getColumn(6, TYPE_DATA);
	fKeyColumn.set("enable", false);
  }
  return true;  
}
*/
efgrid_afterAddNewRow= function( grid_id )
{
  if(grid_id == "ef_grid_r" )
  {
  	var grid = efgrid.getGridObject(grid_id); 	
	var fKeyColumn = grid.getColumn(6, TYPE_DATA);
	var rows = grid.getCheckedRows();
	for (var i = 0 ; i < rows.length;i++ ) {
		if( grid.isNewLine(rows[i]) ) {
			grid.setCellValue(rows[i],6," ",TYPE_DATA);
		}
	}
  }
}

efgrid_onBeforeCellEditNodeDisplay= function(grid_id, row_index, col_index, data_type )
{
  if(grid_id == "ef_grid_r" )
  {
  	var grid = efgrid.getGridObject(grid_id); 	
	var fKeyColumn = grid.getColumn(6, TYPE_DATA);
	var rows = grid.getCheckedRows();
	for (var i = 0 ; i < rows.length;i++ ) {
		if( grid.isNewLine(rows[i]) ) {
			fKeyColumn.set("enable", false);
		}
		else
		{
			fKeyColumn.set("enable", true);
		}
	}	
  }
}

efgrid_onAjaxSubmitSuccess = function(grid_id, service_name, method_name, eiInfo)
{
  if(grid_id == "ef_grid_r" )
  {
	  var grid = efgrid.getGridObject(grid_id); 	
	  var fKeyColumn = grid.getColumn(6, TYPE_DATA);
	  fKeyColumn.set("enable", true);
	  grid.refresh(eiInfo);
  }
}