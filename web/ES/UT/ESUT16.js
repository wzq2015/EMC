efform_onload = function () {
	eftab.show("ef_tab_x");
	efgrid.submitInqu( "ef_grid_user", "es","ESUT16","query");
	var gridselectvalue = efgrid.getGridObject("ef_grid_selectValues");
	gridselectvalue.blockData.rows.pop();	
}

gridMeta = {
  
  "ef_grid_user"     : ["USER",  getI18nMessages("label.ESUser","用户"), 
                        function(rowData){                          
                            return rowData["userId"]; 
                        },
                        function(rowData){                         
                            return rowData["userId"]; 
                        },
                        function(rowData){                          
                            return rowData["userCname"];
                        }]
}

button_f2_onclick = function() {
  var grid = efgrid.getGridObject("ef_grid_selectValues");	
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("ESUT16",grid.getSelectRowsData());	
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
  efgrid.submitInqu( "ef_grid_user", "es","ESUT16","query");
}

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node )
{
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



