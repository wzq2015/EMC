var appTreeModel =  new eiTreeModel('ESUTTR21');
var menuTreeModel =  new eiTreeModel('EDPI12');

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

  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_page");
  efregion.show("ef_region_elem");
  eftab.show("ef_tab_x");
  eftab.show("ef_tab_y");
}

button_f2_onclick = function() {
  var grid = efgrid.getGridObject("ef_grid_selectValues");	
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("ESUT22",grid.getSelectRowsData());	
  }
  window.close();
}

button_f3_onclick = function() {
  var grid = efgrid.getGridObject("ef_grid_selectValues");
  var rowLength = grid.getCheckedRows().length;
  for(i=rowLength-1;i>=0;i--){
   grid.removeRow(grid.getCheckedRows()[i]);
  }
  grid.refresh();	
  efform.setStatus(0,rowLength+getI18nMessages("label.ESRowsHasDeletedSuccess","条记录删除成功!"));
}

button_f4_onclick = function() {
  efgrid.submitInqu( "ef_grid_p", "es","ESLV11","query");
}

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node ){
  if("ef_grid_selectValues" == grid_id){
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

efgrid_onRowClicked = function (id ,row_index){
  var grid = efgrid.getGridObject(id);
  if ( id == "ef_grid_p" ){     
    var cell_value = grid.getCellValue( row_index, 1, TYPE_FIX );
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
  if ( node.top() ){ node.open(true); node.active(true); };  
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   var appL = node.top()?"":node.label();  
   document.getElementById("inqu_status-0-app").value=appL;  
   efgrid.submitInqu( "ef_grid_p", "es","ESLV11","query");
}

function configMenuTree(tree){
  tree.nodeInitializer = menuTreeNodeInitializer;
}

function menuTreeNodeInitializer(node){  
  if ( node.top() ){ node.open(true); return; };  
  node.textClicked = function(){ menuTreeNodeClicked( node ); };
  if ( node.leaf() ){
    node.show(false);
  }
}

function menuTreeNodeClicked(node){
   var grid = efgrid.getGridObject( "ef_grid_p" ); 
   grid.serviceName = "ESLV11";
   document.getElementById("inqu_status-0-pnode").value=node.label();  
   efgrid.submitInqu( "ef_grid_p", "es","ESLV11","queryMenu");
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
