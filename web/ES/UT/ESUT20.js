var appTreeModel =  new eiTreeModel('ESUTTR21');
var menuTreeModel =  new eiTreeModel('EDPI12');
var orgTreeModel =  new eiTreeModel('ESUTTR10');

var ESUT20_Cache_RoleResult = {};//store role's auth


var tabs = "page,POST,ROLE";
var callbackFunc = "efform_onPopupReturn";

filterTabs = function(){
	   
	   var tabDoms = ef.get("ef_tab_x").childNodes;
	   var total = tabDoms.length;
	   for(var k=total-1;k>=0;k--){
	     var tabDom = tabDoms[k];
	     if(tabs.indexOf(tabDom.id) == -1){
	       tabDom.parentNode.removeChild(tabDom);
//	       efform._removeGrid( gridIds[k] );      
	     }
	   }
	  
	} 

gridMeta = {  
  "ef_grid_p"     : [ "PAGE",  getI18nMessages("label.ESPage","页面"), 
                         function(rowData){ return rowData["label"] }, 
                         function(rowData){ return rowData["label"] },
                         function(rowData){ return rowData["name"] }
                       ],
  "ef_grid_e" : ["ELEM",  getI18nMessages("label.ESButton","按钮"),
                        function(rowData){ return document.getElementById("inqu_status-0-page").value + "." + rowData["label"] },
                        function(rowData){ return document.getElementById("inqu_status-0-page").value + "." + rowData["label"] },
                        function(rowData){ return rowData["name"] }]
}

  efform_onload = function () {
  var gridselectvalue = efgrid.getGridObject("ef_grid_selectValues");
  
  gridselectvalue.blockData.rows.pop();

  efgrid.submitInqu( "ef_grid_rt", "es","ES37","query");
  
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_page");
  efregion.show("ef_region_elem");
  
  filterTabs();
  eftab.show("ef_tab_x");
  eftab.show("ef_tab_y");
  
  
  
}

button_f2_onclick = function() {
  var grid = efgrid.getGridObject("ef_grid_selectValues");	
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("ESUT20",grid.getSelectRowsData());	
  }
  window.close();
}

doUpdateOffset = function(pos)
{
	var k;
	var offset ;
	for(k in ESUT20_Cache_RoleResult)
	{
		offset =  ESUT20_Cache_RoleResult[k]["offset"];
		if(offset > pos)
		{
			ESUT20_Cache_RoleResult[k]["offset"]--;
		}else if(offset <= pos && ESUT20_Cache_RoleResult[k].length+offset -1 >= pos)
		{
			return k;
		}
	}
	
	return null;
}
//删除同时操作cache
button_f3_onclick = function() {
  var grid = efgrid.getGridObject("ef_grid_selectValues");
  var rowLength = grid.getCheckedRows().length;
  for(i=rowLength-1;i>=0;i--){
	  
   var node = doUpdateOffset(i);
   
   if(node != null)
   {
	   var offset = ESUT20_Cache_RoleResult[node]["offset"];
	   ESUT20_Cache_RoleResult[node].splice(i-offset,1);
   }
   grid.removeRow(grid.getCheckedRows()[i]);
   
   
  }
  grid.refresh();	
  efform.setStatus(0,rowLength+getI18nMessages("label.ESRowsHasDeletedSuccess","条记录删除成功!"));
}

button_f4_onclick = function() {
  efgrid.submitInqu( "ef_grid_p", "es","ES41","query");
}

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node ){
 
  if("ef_grid_selectValues" == grid_id){
    return;
  }
  if("ef_grid_post" == grid_id)
  {
	 roleSelectRow(row_index);
	 return;
  }
  if("ef_grid_rt" == grid_id)
  {
	 roleTypeSelectRow(row_index);
	 return;
  }
  var grid = efgrid.getGridObject( grid_id );	
  if( !grid.isRowChecked( row_index ))
    selectRow(grid_id,row_index);
  else
    unselectRow(grid_id,row_index);
}

efgrid_onSelectAllClicked = function( grid_id, div_node ){
  if("ef_grid_selectValues" == grid_id){
    return;
  }	
  
  if("ef_grid_post" == grid_id)
  {
	var gridSource = efgrid.getGridObject(grid_id);
	for(var i=0;i<gridSource.getRowCount();i++)
			roleSelectRow(i);
	return;
	  
  }
  
  if("ef_grid_rt" == grid_id)
 {
	  var gridSource = efgrid.getGridObject(grid_id);
		for(var i=0;i<gridSource.getRowCount();i++)
				roleTypeSelectRow(i);
		return;
 }
  if(div_node.firstChild.checked == true){
	selectAll(grid_id);
  }else{
    unselectAll(grid_id);
  }
}
function efgrid_onAjaxSubmitSuccess( grid_id, service_name, method_name, eiInfo ){
  if ( grid_id != "ef_grid_r" ){
    var ef_grid = efform.getGrid( grid_id );	 
    ef_grid.refresh( eiInfo );
  }
}

efgrid_onFixCellClick = function (id ,row_index,col_index, cell_value ){
  var grid = efgrid.getGridObject(id);
  if ( id == "ef_grid_p" ){     
//    var cell_value = grid.getCellValue( row_index, 1, TYPE_FIX );
    document.getElementById("inqu_status-0-page").value=cell_value; 
    efgrid.submitInqu( "ef_grid_e", "es","ES42","query");
  }
}


/* Tree Related Stuffs */

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  if ( node.top() ){ node.open(true); return; };  
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
	
   ef.get("inqu_status-parent").value = node.data().label;   
   efgrid.submitInqu( "ef_grid_p", "es","ES41","query");
}


//orgTREE related
function configOTree(tree){
	  tree.emptyNodeAsLeaf = false;
	  tree.activeEmptyJudger = false;
	  tree.nodeInitializer = orgtreeNodeInitializer;
	}

	function orgtreeNodeInitializer(node){  
	  if ( node.top() ){ return; };
	  node.textClicked = function(){ orgtreeNodeClicked( node ); };
	}

	function orgtreeNodeClicked(node){
		var info = new EiInfo();
		ef.get("inqu_status-org").value = node.data().label;
		ef.get("inqu_status-orgName").value = node.data().text;
		ef.get("inqu_status-parent").value = node.data().label;
		info.setByNameValue("inqu_status-parent",node.data().label);
		EiCommunicator.send("ES31","query",info,{
				onSuccess :
					function(eiInfo){
							var grid = efgrid.getGridObject("ef_grid_post");
							grid.setData(eiInfo);
							grid.refresh();
					},
			    onFail    : 
			    function(eMsg) {
			      alert("failure");
			    }	
			} );	
	}
	
	
// select functions
mapRowId = function(gridSelect, gridCandidate, row) { 
  var gridId = gridCandidate.gridId;  
  var gridSelectType = gridMeta[gridId][0];
  var id = gridMeta[gridId][2].call(this, row)
  
  for(i = 0;i<gridSelect.getRowCount();i++){
	if( gridSelect.getCellValue(i,0,TYPE_DATA,true) == gridSelectType && 
	    gridSelect.getCellValue(i,1,TYPE_DATA,true) == id )
	  return i;
  }
  return -1;
} 


roleTypeSelectRow = function(row_index)
{
    var callback = {
			onSuccess :
				  function(eiInfo) {
					
				    var gridSelect = efgrid.getGridObject( "ef_grid_selectValues" );
					var gridSource = efgrid.getGridObject("ef_grid_rt");
					var result = eiInfo.getBlock("result");
					var ret = result.getRows();
					
					var _arr = new Array();
					
					for(var k=0 ; k< ret.length; k++)
					{
						  if(result.getCell(k,"type") == 1)
							 {
								  grid = "ef_grid_p";
							 }else if(result.getCell(k,"type") == 2)
							 {
								  grid = "ef_grid_e";
							 }
						   var _row = {};
						  _row["clazz"]=gridMeta[grid][0];
						  _row["className"]=gridMeta[grid][1];
						  _row["id"] = result.getCell(k,"label");
						  _row["label"] = result.getCell(k,"label");
						  _row["name"] =result.getCell(k,"name");
						  _arr.push(_row);
					}
					var roleId = gridSource.getRowData(row_index)["label"];
					//put it in cache
					if(ESUT20_Cache_RoleResult[roleId]!=null)
					{
						unselectRowAuth(roleId);
					}
					ESUT20_Cache_RoleResult[roleId] = _arr;
					
				    if( !gridSource.isRowChecked( row_index ))
				        selectRowAuth(roleId);
					
				  },
				onFail : 
				  function(eMsg) {
					alert(eMsg);
				  }
    }
    
    var gridSource = efgrid.getGridObject("ef_grid_rt");
    var rowData = gridSource.getRowData(row_index);
    var roleId = gridSource.getRowData(row_index)["label"];
    
    if( !gridSource.isRowChecked( row_index ))
    {
  	 
        var eiinfo = new EiInfo();
	    eiinfo.setByNameValue("inqu_status-parent", rowData["label"]);  
	    eiinfo.setByNameValue("inqu_status-0-label", "");
	    eiinfo.setByNameValue("inqu_status-0-limit", 10000); 
	    eiinfo.setByNameValue("inqu_status-0-source", "3");
	    eiinfo.setByNameValue("inqu_status-0-type", "0");   
	    EiCommunicator.send("ES55","query",eiinfo,callback);
    }else{
    	unselectRowAuth(roleId);
    }
}



roleSelectRow = function(row_index)
{
	var callback = {
			onSuccess :
			  function(eiInfo) {
				
				var gridSelect = efgrid.getGridObject( "ef_grid_selectValues" );
				var gridSource = efgrid.getGridObject("ef_grid_post");
				var result = eiInfo.getBlock("result");
				var ret = result.getRows();
				var grid;
			    var _arr = new Array();
				for(var k=0 ; k< ret.length; k++)
				{
					  if(result.getCell(k,"type") == 1)
					 {
						  grid = "ef_grid_p";
					 }else if(result.getCell(k,"type") == 2)
					 {
						  grid = "ef_grid_e";
					 }
						  
					  var _row = {};
					  _row["clazz"]=gridMeta[grid][0];
					  _row["className"]=gridMeta[grid][1];
					  _row["id"] = result.getCell(k,"label");
					  _row["label"] = result.getCell(k,"label");
					  _row["name"] =result.getCell(k,"name");
					  _arr.push(_row);
				}
				
				var roleId = gridSource.getRowData(row_index)["postId"];
				//put it in cache
				if(ESUT20_Cache_RoleResult[roleId]!=null)
				{
					unselectRowAuth(roleId);
				}
				ESUT20_Cache_RoleResult[roleId] = _arr;
				
			    if( !gridSource.isRowChecked( row_index ))
			        selectRowAuth(roleId);
			   
			  },
			onFail : 
			  function(eMsg) {
				alert(eMsg);
			  }
	};
  //get List
  var gridSource = efgrid.getGridObject("ef_grid_post");
  var rowData = gridSource.getRowData(row_index);
  var roleId = gridSource.getRowData(row_index)["postId"];
  if( !gridSource.isRowChecked( row_index ))
  {
	 

	  var eiinfo = new EiInfo();
	  eiinfo.setByNameValue("inqu_status-parent", rowData["postId"]);  
	  eiinfo.setByNameValue("inqu_status-0-label", "");
	  eiinfo.setByNameValue("inqu_status-0-limit", 10000); 
	  eiinfo.setByNameValue("inqu_status-0-source", "0");
	  eiinfo.setByNameValue("inqu_status-0-type", "0");   
	 	  
	  EiCommunicator.send("ES55","query",eiinfo,callback);
  }else{
	  
	  unselectRowAuth(roleId);
  }
 
}

selectRowAuth = function(roleId)
{
	var gridSelect = efgrid.getGridObject( "ef_grid_selectValues" );
	var _arr = ESUT20_Cache_RoleResult[roleId];
	
	var lastPos = gridSelect.getRowCount();
	
	gridSelect.addRowData(_arr);
	ESUT20_Cache_RoleResult[roleId]["offset"] = lastPos;

	
	for(var k = 0 ;k < gridSelect.getRowCount();k++)
	{
		gridSelect.setRowChecked(k,true);					
	}
	gridSelect.refresh(); 
}

unselectRowAuth = function(roleId)
{
	var gridSelect = efgrid.getGridObject( "ef_grid_selectValues" );
	
	if(ESUT20_Cache_RoleResult[roleId] != null || typeof (ESUT20_Cache_RoleResult[roleId]) != undefined)
	{
		var _arr = ESUT20_Cache_RoleResult[roleId];
		var offset = ESUT20_Cache_RoleResult[roleId]["offset"];
		for(var k = _arr.length - 1 ; k>= 0; k--)
		{
			gridSelect.removeRow(k+offset);//
		}
		gridSelect.refresh();
		//delete cache
		
		delete ESUT20_Cache_RoleResult[roleId];
	}
	
}






selectRow = function(grid ,row_index){
  var gridCandidate = efgrid.getGridObject(grid);  
  var gridSelect = efgrid.getGridObject("ef_grid_selectValues");
  var rowData = gridCandidate.getRowData(row_index);
  
  var mapRowIdex = mapRowId(gridSelect, gridCandidate, rowData);
  if(mapRowIdex >= 0){
    return;
  }
  
  var _row = {};
  _row["clazz"]=gridMeta[grid][0];
  _row["className"]=gridMeta[grid][1];
  _row["id"] = gridMeta[grid][2].call(this, rowData);
  _row["label"] = gridMeta[grid][3].call(this, rowData);
  _row["name"] =gridMeta[grid][4].call(this, rowData);
  
  var _arr = new Array();
  _arr.push(_row);
  gridSelect.addRowData( _arr );
  for(var k = 0;k<gridSelect.getRowCount();k++)
	 gridSelect.setRowChecked(k,true);					
  gridSelect.refresh(); 
}

unselectRow = function(grid ,row_index) {
  var gridCandidate = efgrid.getGridObject(grid);  
  var gridSelect = efgrid.getGridObject("ef_grid_selectValues");
  var rowData = gridCandidate.getRowData(row_index);
  
  var mapRowIdex = mapRowId(gridSelect, gridCandidate, rowData);
  if( mapRowIdex >= 0 ){
    gridSelect.removeRow(mapRowIdex);	
  }  	
  gridSelect.refresh();
} 

selectAll = function(grid_id){
  var grid = efgrid.getGridObject( grid_id );
  for(var i=0;i<grid.getRowCount();i++)
	selectRow(grid_id,i);
}

unselectAll = function(grid_id){
  var grid = efgrid.getGridObject( grid_id );
  for(var i=0;i<grid.getRowCount();i++)
	unselectRow(grid_id,i);
}

function configMenuTree(tree){
	  tree.nodeInitializer = menuTreeNodeInitializer;
}

function menuTreeNodeInitializer(node) {
	if (node.top()) {
		node.open(true);
		return;
	}
	
	node.textClicked = function() {
		menuTreeNodeClicked(node);
	};
	if (node.leaf()) {
		node.show(false);
	}
}

function menuTreeNodeClicked(node) {
	var grid = efgrid.getGridObject("ef_grid_p");
	grid.serviceName = "ES46";
	document.getElementById("inqu_status-0-pnode").value = node.label();
	efgrid.submitInqu("ef_grid_p", "es", "ES46", "queryPagesByMenuNode");
}
